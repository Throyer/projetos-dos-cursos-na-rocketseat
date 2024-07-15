import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

class TypeormAppointmentRepository implements AppointmentRepository {
    constructor(
        private typeormRepository: Repository<Appointment> = getRepository(
            Appointment,
        ),
    ) {}

    public async save({
        date,
        provider_id,
    }: CreateAppointmentDTO): Promise<Appointment> {
        const appointment = await this.typeormRepository.save({
            date,
            provider_id,
        });
        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const appointment = await this.typeormRepository.findOne({
            where: { date },
        });

        return appointment;
    }
}

export default TypeormAppointmentRepository;
