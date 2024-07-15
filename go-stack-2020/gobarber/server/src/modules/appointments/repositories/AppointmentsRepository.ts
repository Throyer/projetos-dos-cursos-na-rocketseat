import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

export default interface AppointmentRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
    save(appointment: CreateAppointmentDTO): Promise<Appointment>;
}
