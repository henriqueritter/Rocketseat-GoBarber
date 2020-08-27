import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
// import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
// let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    // createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider); // para criar usuario para o service
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeHashProvider,
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
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
    await expect(
      authenticateUser.execute({
        email: 'naoexiste@nao.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'fulano@fulano.com',
        password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
