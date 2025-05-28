import {Company} from "../entities/company.entity";
import {AppDataSource} from "../config/data-source";

export class CompanyService {
    private repository = AppDataSource.getRepository(Company);

    async getById(id: string) {
        const company = await this.repository.findOneBy({id});
        if (!company) return null;
        return company;
    }

    async create(data: Partial<Company>) {
        const company = this.repository.create(data);
        return this.repository.save(company);
    }

    async update(id: string, data: Partial<Company>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        await this.getById(id);
        return this.repository.delete(id);
    }

    async getAll() {
        return this.repository.find();
    }
}