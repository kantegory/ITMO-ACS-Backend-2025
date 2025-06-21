import {Resume} from "../entities/resume.entity";
import {AppDataSource} from "../config/data-source";

export class ResumeService {
    private repository = AppDataSource.getRepository(Resume);

    async getById(id: string) {
        const resume = await this.repository.findOneBy({id});
        if (!resume) return null;
        return resume;
    }

    async create(data: Partial<Resume>) {
        const resume = this.repository.create(data);
        return this.repository.save(resume);
    }

    async update(id: string, data: Partial<Resume>) {
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