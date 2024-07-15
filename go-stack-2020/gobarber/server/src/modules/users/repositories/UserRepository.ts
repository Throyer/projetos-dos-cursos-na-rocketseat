import User from '@modules/users/infra/typeorm/entities/User';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

export default interface UserRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    save(user: CreateUserDTO): Promise<User>;
    update(user: User): Promise<User>;
}
