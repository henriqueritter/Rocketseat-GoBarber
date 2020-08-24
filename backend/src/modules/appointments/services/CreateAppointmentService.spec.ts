import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should be not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11); // ano, mes(setembro), dia, hora

    await createAppointment.execute({
      // Cria um novo agendamento com uma data setada acima
      date: appointmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate, // Cria um segundo agendamento na mesma data
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError); // deve retornar um erro (rejects) do tipo do AppError
  });
});
