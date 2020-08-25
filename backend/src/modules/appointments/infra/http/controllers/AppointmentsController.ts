import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
// injecao de dependencia

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    // usuario logado
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService); // o container resolve vai carregar o serice e verificar se precisa de alguma dependencia
    // se precisar ele vai retornar

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });
    return response.json(appointment);
    // se houver algum erro no execute(retornado pelo throw) ele executara nesse catch
    // a mensagem vem daquela digitada no Error do services
  }
}
