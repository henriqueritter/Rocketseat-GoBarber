import { container } from 'tsyringe';

// para importar o bcrypthashprovider
import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

// utilizamos o registerSingleton para ele instanciar esse objeto uma vez só para toda
// a vida da aplicacao
container.registerSingleton<IAppointmentsRepository>( // vai garantir que a variavel que passamos no segundo parameto tenha o formato da Interface
  'AppointmentsRepository', // o nome aqui nao importa
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>( // vai garantir que a variavel que passamos no segundo parameto tenha o formato da Interface
  'UsersRepository', // o nome aqui nao importa
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
