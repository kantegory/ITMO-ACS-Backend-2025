import { Request, Response } from 'express';
import { PaymentRepository } from '../repositories/paymentRepo';

export class PaymentController {
    private paymentRepo: PaymentRepository;

    constructor() {
        this.paymentRepo = new PaymentRepository();
    }

    async createPayment(req: Request, res: Response) {
        const payment = await this.paymentRepo.createPayment(req.body);
        res.status(201).json(payment);
    }

    async getPayments(req: Request, res: Response) {
        const payments = await this.paymentRepo.findWithFilters(req.query);
        res.json(payments);
    }

    async getPaymentById(req: Request, res: Response) {
        const payment = await this.paymentRepo.findById(Number(req.params.id));
        res.json(payment);
    }

    async updatePayment(req: Request, res: Response) {
        const payment = await this.paymentRepo.updatePayment(
            Number(req.params.id),
            req.body
        );
        res.json(payment);
    }

    async deletePayment(req: Request, res: Response) {
        await this.paymentRepo.deletePayment(Number(req.params.id));
        res.status(204).send();
    }
}