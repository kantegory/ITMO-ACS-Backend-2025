import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Education } from '../models/Education';

export class EducationService extends BaseService<Education> {
    constructor() {
        super(dataSource.getRepository(Education));
    }

    public async listByResume(resumeId: string): Promise<Education[]> {
        return this.repo.find({ where: { resume: { id: resumeId } } as any });
    }
}