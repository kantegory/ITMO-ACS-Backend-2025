import { BaseService } from './base';
import dataSource from '../config/data-source';
import { Vacancy } from '../models/Vacancy';

export class VacancyService extends BaseService<Vacancy> {
    constructor() {
        super(dataSource.getRepository(Vacancy));
    }

    public async listByCompany(companyId: string): Promise<Vacancy[]> {
        return this.repo.find({ where: { company: { id: companyId } } as any, relations: ['skills', 'applications'] });
    }

    public async listActive(): Promise<Vacancy[]> {
        const now = new Date();
        return this.repo
            .createQueryBuilder('vacancy')
            .where('vacancy.expireDate IS NULL OR vacancy.expireDate > :now', { now })
            .getMany();
    }
}