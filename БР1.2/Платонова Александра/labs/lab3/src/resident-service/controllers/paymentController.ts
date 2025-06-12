import { Request, Response } from 'express';
import { PaymentRepository } from '../repositories/paymentRepository';

export class PaymentController {
    private paymentRepo: PaymentRepository;

    constructor() {
        this.paymentRepo = new PaymentRepository();
    }

    async getMyPayments(req: Request, res: Response) {
        const residentId = req.user.id;
        const payments = await this.paymentRepo.findByResidentId(residentId);
        res.json(payments);
    }

    async createPayment(req: Request, res: Response) {
        const residentId = req.user.id;
        const { amount } = req.body;
        const payment = await this.paymentRepo.createPayment(residentId, amount);
        res.status(201).json(payment);
    }
}