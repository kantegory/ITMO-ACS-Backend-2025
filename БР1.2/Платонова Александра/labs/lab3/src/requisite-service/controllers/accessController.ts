import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { AccessRuleRepository } from '../repositories/accessRuleRepository';

export class AccessController {
    private userRepo: UserRepository;
    private accessRuleRepo: AccessRuleRepository;

    constructor() {
        this.userRepo = new UserRepository();
        this.accessRuleRepo = new AccessRuleRepository();
    }

    async assignAccess(req: Request, res: Response) {
        const { userId, entityType, entityId } = req.body;

        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const rule = this.accessRuleRepo.create({
            entity_type: entityType,
            entity_id: entityId,
            user: { id: userId },
        });

        await this.accessRuleRepo.save(rule);
        res.status(201).json(rule);
    }

    async getUserAccessRules(req: Request, res: Response) {
        const { userId } = req.query;
        const rules = await this.accessRuleRepo.find({
            where: { user: { id: Number(userId) } },
        });
        res.json(rules);
    }

    async revokeAccess(req: Request, res: Response) {
        const { id } = req.params;
        await this.accessRuleRepo.delete(id);
        res.status(204).send();
    }
}