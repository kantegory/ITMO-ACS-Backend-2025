import { Repository } from 'typeorm';
import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Resume } from '../models/Resume';

export class ResumeService extends BaseService<Resume> {
    constructor() {
        super(dataSource.getRepository(Resume));
    }

    public async listByUser(userId: string): Promise<Resume[]> {
        return this.repo.find({
            where: { user: { id: userId } } as any,
            relations: ['educations', 'experiences', 'resumeSkills'],
        });
    }
}