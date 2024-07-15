import { Router } from 'express';

import authenticationCheck from '@modules/users/infra/http/middlewares/authenticationCheck';
import AppointmentsController from '../controllers/AppointmentsController';

const appointments = Router();
const controller = new AppointmentsController();

appointments.use(authenticationCheck);

// appointments.get('/', async (request, response) => {

//     const appointments = await repository.find();
//     return response.json(appointments);
// });

appointments.post('/', controller.create);

export default appointments;
