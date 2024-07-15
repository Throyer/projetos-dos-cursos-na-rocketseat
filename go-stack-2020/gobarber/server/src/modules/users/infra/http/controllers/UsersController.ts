import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const service = container.resolve(CreateUserService);

        const user = await service.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    }

    public async avatar(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = container.resolve(UpdateUserAvatarService);

        const user = await service.execute({
            user_id: request.user.id,
            filename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    }
}
