import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // para criar usuario para o service
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'fulano@fulano.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not authenticate with a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'naoexiste@nao.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // para criar usuario para o service
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'fulano@fulano.com',
        password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
