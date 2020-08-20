import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with same email from another one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');

    expect(
      createUser.execute({
        name: 'Henrique',
        email: 'fulano@fulano.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
