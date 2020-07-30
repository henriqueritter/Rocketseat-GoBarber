import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

// Toda rota que iniciar com /appointment vai repassar o que vem após appointments
// para dentro do appointmentsRouter(as rotas serao tratadas la no outro arquivo)

export default routes;
