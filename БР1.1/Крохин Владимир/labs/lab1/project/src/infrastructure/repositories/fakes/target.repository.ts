import { TargetModel } from '../../../application/domain/target.model';
import { BaseFakeRepository } from './base.repository';
import { TargetRepository } from '../interfaces/target.repository';

export class FakeTargetRepository extends BaseFakeRepository<TargetModel> implements TargetRepository {
    async findByName(name: string): Promise<TargetModel | null> {
        return this.items.find(target => target.name === name) || null;
    }
} 