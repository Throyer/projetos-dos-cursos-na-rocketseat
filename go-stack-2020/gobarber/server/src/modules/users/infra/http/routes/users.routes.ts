import { Router } from 'express';
import multer from 'multer';

import { STORAGE } from '@config/uploading';

import authenticationCheck from '@modules/users/infra/http/middlewares/authenticationCheck';
import UsersController from '../controllers/UsersController';

const users = Router();
const upload = multer(STORAGE);
const controller = new UsersController();

users.post('/', controller.create);

users.patch(
    '/avatar',
    authenticationCheck,
    upload.single('avatar'),
    controller.avatar,
);

export default users;
