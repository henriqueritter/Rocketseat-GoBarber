import { Request, Response } from 'express';
import { container } from 'tsyringe';
// injecao de dependencia

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // usuario logado
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    ); // o container resolve vai carregar o serice e verificar se precisa de alguma dependencia
    // se precisar ele vai retornar

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(appointments);
    // se houver algum erro no execute(retornado pelo throw) ele executara nesse catch
    // a mensagem vem daquela digitada no Error do services
  }
}
