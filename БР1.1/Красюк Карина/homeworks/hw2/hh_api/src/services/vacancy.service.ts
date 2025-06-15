import {Vacancy} from "../entities/vacancy.entity";
import {AppDataSource} from "../config/data-source";

export class VacancyService {
    private repository = AppDataSource.getRepository(Vacancy);

    async getById(id: string) {
        const vacancy = await this.repository.findOneBy({ id });
        if (!vacancy) return null;
        return vacancy;
    }

    async create(data: Partial<Vacancy>) {
        const vacancy = this.repository.create(data);
        return this.repository.save(vacancy);
    }

    async update(id: string, data: Partial<Vacancy>) {
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