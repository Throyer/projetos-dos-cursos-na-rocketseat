import { inject, injectable } from 'tsyringe';

import { hash } from 'bcryptjs';

import HttpStatusError from '@shared/errors/HttpStatusError';

import { HttpStatus } from '@utils/http-status';

import User from '@modules/users/infra/typeorm/entities/User';

import UserRepository from '../repositories/UserRepository';

interface UserForm {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(@inject('UserRepository') private repository: UserRepository) {}

    public async execute({ name, email, password }: UserForm): Promise<User> {
        const exists = await this.repository.findByEmail(email);

        if (exists) {
            throw new HttpStatusError(
                'Email já utilizado.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.repository.save({
            name,
            email,
            password: await hash(password, 8),
        });

        return user;
    }
}

export default CreateUserService;
