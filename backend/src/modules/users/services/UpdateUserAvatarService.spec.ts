import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
// import AuthenticateUserService from './AuthenticateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test.jpg',
    });

    expect(user.avatar).toBe('test.jpg');
  });

  it('should not be able to update user avatar with non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'usuariofake',
        avatarFilename: 'test.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete when updating new user avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'henrique',
      email: 'fulano@fulano.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'newtest.jpg',
    });

    // esperamos que a funcao Delete File seja chamada com o parametro newtest.jpg
    expect(deleteFile).toHaveBeenCalledWith('test.jpg');
    expect(user.avatar).toBe('newtest.jpg');
  });
});
