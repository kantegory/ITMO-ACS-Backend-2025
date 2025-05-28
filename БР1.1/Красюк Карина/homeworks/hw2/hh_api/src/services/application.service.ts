import {AppDataSource} from "../config/data-source";
import {Application} from "../entities/application.entity";
export class ApplicationService {
    private repository = AppDataSource.getRepository(Application);

    async getById(id: string) {
        const application = await this.repository.findOneBy({id});
        if (!application) return null;
        return application;
    }

    async create(data: Partial<Application>) {
        const application = this.repository.create(data);
        return this.repository.save(application);
    }

    async update(id: string, data: Partial<Application>) {
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