import { EntityRepository, Repository } from 'typeorm';
import { Payment } from '../models/payment';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
    async findByResidentId(residentId: number): Promise<Payment[]> {
        return this.createQueryBuilder('payment')
            .leftJoin('payment.checkInOut', 'checkInOut')
            .where('checkInOut.resident_id = :residentId', { residentId })
            .getMany();
    }

    async createPayment(residentId: number, amount: number): Promise<Payment> {
        const payment = this.create({ amount, status: 'pp', date_pay: new Date() });
        return this.save(payment);
    }
}