import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Application } from '../models/Application';

export class ApplicationService extends BaseService<Application> {
    constructor() {
        super(dataSource.getRepository(Application));
    }

    public async listByUser(userId: string): Promise<Application[]> {
        return this.repo.find({ where: { user: { id: userId } } as any, relations: ['vacancy'] });
    }

    public async listByVacancy(vacancyId: string): Promise<Application[]> {
        return this.repo.find({ where: { vacancy: { id: vacancyId } } as any, relations: ['user'] });
    }
}