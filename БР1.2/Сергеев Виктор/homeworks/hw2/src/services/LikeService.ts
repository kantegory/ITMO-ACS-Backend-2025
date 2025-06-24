import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Like } from "../models/Like";

export class LikeService {
    private repository: Repository<Like>

    constructor() {
        this.repository = AppDataSource.getRepository(Like);
    }

    getAllLikes = async(): Promise<Array<Like>> => {
        return this.repository.find();
    }

    getLikeById = async (id: number): Promise<Like | null> => {
        return this.repository.findOneBy({id: id});
    }

    createLike = async (data: Partial<Like>): Promise<Like> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateLike = async (id: number, data: Partial<Like>): Promise<Like | null> => {
        const entity = await this.getLikeById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteLike = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}