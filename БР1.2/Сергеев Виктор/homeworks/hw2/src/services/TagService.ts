import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Tag } from "../models/Tag";

export class TagService {
    private repository: Repository<Tag>

    constructor() {
        this.repository = AppDataSource.getRepository(Tag);
    }

    getAllTags = async(): Promise<Array<Tag>> => {
        return this.repository.find();
    }

    getTagById = async (id: number): Promise<Tag | null> => {
        return this.repository.findOneBy({id: id});
    }

    createTag = async (data: Partial<Tag>): Promise<Tag> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateTag = async (id: number, data: Partial<Tag>): Promise<Tag | null> => {
        const entity = await this.getTagById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteTag = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}