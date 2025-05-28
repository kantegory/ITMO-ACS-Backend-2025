import { Repository, ObjectLiteral, FindManyOptions } from "typeorm";
import { NotFoundError } from "../errors/NotFoundError";

export abstract class BaseService<Model extends ObjectLiteral, DTO> {
    constructor(protected readonly repository: Repository<Model>){}

    protected abstract toDto(model: Model): DTO 

    async findAll(options?: FindManyOptions<Model>): Promise<DTO[]> {
        const foundModels = await this.repository.find(options)
        return foundModels.map((m: Model) => this.toDto(m))
    }

    async findById(id: number, relations: string[]): Promise<DTO | null> {
        const model: Model | null = await this.repository.findOne({ where: {id: id} as any, relations: relations })
        if (!model)
            throw new NotFoundError("Can't find record with this id")
        return this.toDto(model)
    }

    // async update()
}
