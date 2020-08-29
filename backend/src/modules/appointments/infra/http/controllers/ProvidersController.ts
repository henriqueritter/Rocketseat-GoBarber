import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// injecao de dependencia
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService); // o container resolve vai carregar o serice e verificar se precisa de alguma dependencia
    // se precisar ele vai retornar

    const providers = await listProviders.execute({
      user_id,
    });
    return response.json(classToClass(providers));
    // se houver algum erro no execute(retornado pelo throw) ele executara nesse catch
    // a mensagem vem daquela digitada no Error do services
  }
}
