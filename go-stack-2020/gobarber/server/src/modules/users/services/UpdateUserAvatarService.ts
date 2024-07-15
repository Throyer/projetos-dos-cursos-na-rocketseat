import fs from 'fs';
import path from 'path';

import { inject, injectable } from 'tsyringe';

import { DIRECTORY } from '@config/uploading';

import HttpStatusError from '@shared/errors/HttpStatusError';

import { HttpStatus } from '@utils/http-status';

import User from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '../repositories/UserRepository';

interface AvatarFrom {
    user_id: string;
    filename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(@inject('UserRepository') private repository: UserRepository) {}

    public async execute({ user_id, filename }: AvatarFrom): Promise<User> {
        const user = await this.repository.findById(user_id);

        if (!user) {
            throw new HttpStatusError(
                'Usuario não autorizado a trocar de avatar.',
                HttpStatus.FORBIDDEN,
            );
        }

        if (user.avatar) {
            const file = path.join(DIRECTORY, user.avatar);
            const exists = await fs.promises.stat(file);

            if (exists) {
                await fs.promises.unlink(file);
            }
        }

        user.avatar = filename;

        await this.repository.update(user);

        return user;
    }
}

export default UpdateUserAvatarService;
