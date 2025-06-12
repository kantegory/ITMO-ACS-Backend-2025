import { EntityRepository, Repository } from 'typeorm';
import { AccessRule } from '../models/accessRule';

@EntityRepository(AccessRule)
export class AccessRuleRepository extends Repository<AccessRule> {
    async findForUser(userId: number): Promise<AccessRule[]> {
        return this.find({ where: { user: { id: userId } } });
    }
}