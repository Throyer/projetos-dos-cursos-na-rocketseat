import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessions = Router();
const controller = new SessionsController();

sessions.post('/', controller.create);

export default sessions;
