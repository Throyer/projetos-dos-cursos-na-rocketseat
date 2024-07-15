import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '@modules/users/repositories/UserRepository';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

class TypeormUserRepository implements UserRepository {
    constructor(
        private typeormRepository: Repository<User> = getRepository(User),
    ) {}

    public async save({ email, name, password }: CreateUserDTO): Promise<User> {
        const user = await this.typeormRepository.save({
            email,
            name,
            password,
        });
        return user;
    }

    public async update(user: User): Promise<User> {
        const updated = await this.typeormRepository.save(user);
        return updated;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.typeormRepository.findOne({
            where: { id },
        });

        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.typeormRepository.findOne({
            where: {
                email,
            },
        });

        return user;
    }
}

export default TypeormUserRepository;
