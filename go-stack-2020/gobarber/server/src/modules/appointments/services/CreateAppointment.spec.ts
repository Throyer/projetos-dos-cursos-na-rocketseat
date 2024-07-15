import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointService from "./CreateAppointmentService";

describe('CreateAppointService', () => {
    it('should be able to create a new appointment', async () => {
        const repository = new FakeAppointmentRepository();
        const service = new CreateAppointService(repository);

        const appointment = await service.execute({
            date: new Date(),
            provider_id: '123456'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    })

    // it('should not be able to create two appointments on the same time', () => {

    // })
})
