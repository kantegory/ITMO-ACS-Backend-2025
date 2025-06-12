import { EntityRepository, Repository, Between } from 'typeorm';
import { Payment } from '../models/payment';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
    async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
        const payment = this.create(paymentData);
        return this.save(payment);
    }

    async findWithFilters(filters: {
        status?: 'p' | 'np' | 'pp';
        minAmount?: number;
        maxAmount?: number;
        date_from?: Date;
        date_to?: Date;
        checkInOutId?: number;
    }): Promise<Payment[]> {
        return this.find({
            where: {
                status: filters.status,
                amount: filters.minAmount && filters.maxAmount
                    ? Between(filters.minAmount, filters.maxAmount)
                    : undefined,
                date_pay: filters.date_from && filters.date_to
                    ? Between(filters.date_from, filters.date_to)
                    : undefined,
                checkInOut: { id: filters.checkInOutId },
            },
            relations: ['checkInOut'],
        });
    }

    async findById(id: number): Promise<Payment | undefined> {
        return this.findOne({
            where: { id },
            relations: ['checkInOut']
        });
    }

    async updatePayment(id: number, updateData: Partial<Payment>): Promise<Payment | undefined> {
        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    async deletePayment(id: number): Promise<void> {
        await this.delete(id);
    }
}