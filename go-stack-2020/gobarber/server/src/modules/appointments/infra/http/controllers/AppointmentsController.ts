import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date: requestDate } = request.body;

        const date = parseISO(requestDate);

        const service = container.resolve(CreateAppointService);

        const appointment = await service.execute({
            provider_id,
            date,
        });

        return response.json(appointment);
    }
}
