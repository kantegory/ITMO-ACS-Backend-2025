import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Interview } from '../models/Interview';

export class InterviewService extends BaseService<Interview> {
    constructor() {
        super(dataSource.getRepository(Interview));
    }

    public async getByApplication(applicationId: string): Promise<Interview | null> {
        return this.repo.findOne({ where: { application: { id: applicationId } } as any });
    }
}
