import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import TypeormAppointmentRepository from '@modules/appointments/infra/typeorm/repositories/TypeormAppointmentRepository';

import UsersRepository from '@modules/users/repositories/UserRepository';
import TypeormUserRepository from '@modules/users/infra/typeorm/repositories/TypeormUserRepository';

container.registerSingleton<AppointmentsRepository>(
    'AppointmentsRepository',
    TypeormAppointmentRepository,
);

container.registerSingleton<UsersRepository>(
    'UsersRepository',
    TypeormUserRepository,
);
