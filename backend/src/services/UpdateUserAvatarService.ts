import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs'; // filesystem do Node
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // ira procurar um usuario pela ID
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Delete avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // retorna se o usuario tinha avatar ou nao, funcao stat retorna status de um arquivo(se existir)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // se tinha avatar ele remove
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // o campo avatar do usuario atual (da instancia criada) sera atualizado para a nova imagem
    user.avatar = avatarFilename;

    // o metodo save do TypeORM ira Atualizar o usuario pois a sua ID ja existe
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
