import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvier: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvier = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository, // essa instancia esta esperando uma interface de repository por isso instaciamos o fake repositorio acima
      fakeHashProvider,
      fakeCacheProvier,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with same email from another one', async () => {
    const user = await createUser.execute({
      name: 'Henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');

    await expect(
      createUser.execute({
        name: 'Henrique',
        email: 'fulano@fulano.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
