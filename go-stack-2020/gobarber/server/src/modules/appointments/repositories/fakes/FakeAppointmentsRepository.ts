import { v4 as uuid } from 'uuid';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

class FakeAppointmentRepository implements AppointmentRepository {

    private DATABASE: Appointment[] = [];

    public async save({
        date,
        provider_id,
    }: CreateAppointmentDTO): Promise<Appointment> {

        const appointment = Object.assign(new Appointment(), {
            id: uuid(),
            date,
            provider_id,
        })

        this.DATABASE.push(appointment)

        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const appointment = this.DATABASE
            .find(({ date: dbDate }) => date === dbDate);
        return appointment;
    }
}

export default FakeAppointmentRepository;
