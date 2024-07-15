import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';

import HttpStatusError from '@shared/errors/HttpStatusError';

import { HttpStatus } from '@utils/http-status';

interface AppointmentForm {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointService {
    constructor(
        @inject('AppointmentRepository')
        private repository: AppointmentRepository,
    ) {}

    public async execute({
        provider_id,
        date: requestDate,
    }: AppointmentForm): Promise<Appointment> {
        const date = startOfHour(requestDate);

        const exists = await this.repository.findByDate(date);

        if (exists) {
            throw new HttpStatusError(
                'Horario já utilizado em outro agendamento. Por favor escolha um diferente.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const appointment = await this.repository.save({
            provider_id,
            date,
        });

        return appointment;
    }
}

export default CreateAppointService;
