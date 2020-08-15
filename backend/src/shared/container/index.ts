import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

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
