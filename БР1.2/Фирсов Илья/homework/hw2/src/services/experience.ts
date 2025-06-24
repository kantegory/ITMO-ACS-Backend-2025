import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Experience } from '../models/Experience';

export class ExperienceService extends BaseService<Experience> {
    constructor() {
        super(dataSource.getRepository(Experience));
    }

    public async listByResume(resumeId: string): Promise<Experience[]> {
        return this.repo.find({ where: { resume: { id: resumeId } } as any });
    }
}