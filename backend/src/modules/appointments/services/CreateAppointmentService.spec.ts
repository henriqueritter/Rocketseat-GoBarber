import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '3333',
      provider_id: '1234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234');
  });

  it('should be not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11); // ano, mes(setembro), dia, hora

    await createAppointment.execute({
      // Cria um novo agendamento com uma data setada acima
      date: appointmentDate,
      user_id: '3333',
      provider_id: '1234',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate, // Cria um segundo agendamento na mesma data
        user_id: '3333',
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError); // deve retornar um erro (rejects) do tipo do AppError
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '3333',
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11); // ano, mes(setembro), dia, hora

    await createAppointment.execute({
      // Cria um novo agendamento com uma data setada acima
      date: appointmentDate,
      user_id: '3333',
      provider_id: '1234',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate, // Cria um segundo agendamento na mesma data
        user_id: '3333',
        provider_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError); // deve retornar um erro (rejects) do tipo do AppError
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '12345',
        user_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      // mocka a data/hora para este periodo abaixo,assim os testes ocorrem apos isso
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '1234',
        user_id: '3333',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: '1234',
        user_id: '3333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
