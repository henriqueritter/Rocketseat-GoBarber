import path from 'path';
import fs from 'fs'; // filesystem do Node
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  // dependency inversion
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // ira procurar um usuario pela ID
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
      // // Delete avatar anterior
      // const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // // retorna se o usuario tinha avatar ou nao, funcao stat retorna status de um arquivo(se existir)
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // // se tinha avatar ele remove
      // if (userAvatarFileExists) {
      //   await fs.promises.unlink(userAvatarFilePath);
      // }
    }
    // se nao entrou no IF acima entao atualizara o avatar abaixo
    const filename = await this.storageProvider.saveFile(avatarFilename);
    // o campo avatar do usuario atual (da instancia criada) sera atualizado para a nova imagem
    user.avatar = filename;

    // o metodo save do TypeORM ira Atualizar o usuario pois a sua ID ja existe
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
