import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Comment } from "../models/Comment";

export class CommentService {
    private repository: Repository<Comment>

    constructor() {
        this.repository = AppDataSource.getRepository(Comment);
    }

    getAllComments = async(): Promise<Array<Comment>> => {
        return this.repository.find();
    }

    getCommentById = async (id: number): Promise<Comment | null> => {
        return this.repository.findOneBy({id: id});
    }

    createComment = async (data: Partial<Comment>): Promise<Comment> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateComment = async (id: number, data: Partial<Comment>): Promise<Comment | null> => {
        const entity = await this.getCommentById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteComment = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}