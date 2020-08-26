// index,show,create,update,delete  //o maximo que um contrller no MVC pode ter de metodos
// mais que isso é necessario criar um novo controller
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // password sendo deletado pelo class transformer
    // delete user.password;

    return response.json({ user: classToClass(user), token });
  }
}
