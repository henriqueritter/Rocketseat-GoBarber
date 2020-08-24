import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    // cria o repositorio de appointment
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    // cria instancia da classe
    const userToken = this.ormRepository.create({
      user_id,
    });

    // cria o token no banco
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
