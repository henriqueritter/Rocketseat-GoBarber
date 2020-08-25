import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'henriqueque',
      email: 'henrique@henrique.com',
    });

    expect(updatedUser.name).toBe('henriqueque');
    expect(updatedUser.email).toBe('henrique@henrique.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Usuario Test',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'henrique@fulano.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'henriqueque',
        email: 'fulano@fulano.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'henrique',
      email: 'fulano@fulano.com',
      old_password: '123456',
      password: 'batata',
    });

    expect(updatedUser.password).toBe('batata');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'henrique',
        email: 'fulano@fulano.com',
        password: 'batata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'henrique',
        email: 'fulano@fulano.com',
        old_password: 'wrong-old-password',
        password: 'batata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
