import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

// injecao de dependencias
import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// DTO do Appointment
interface IRequestAppointment {
  provider_id: string;
  date: Date;
}

@injectable() // vai em toda classe que usa injecao de dependencias
class CreateAppointmentService {
  // Por definir esse parametro como private ele vai criar essa variavel(a mesma coisa que inicializar ela com o this..)

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestAppointment): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // metodo para salvar o appointment no banco de dados

    return appointment;
  }
}

export default CreateAppointmentService;
