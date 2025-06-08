import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export class BaseService<T> {
    protected repository: Repository<T>;
    protected model: new () => T;

    constructor(model: new () => T) {
        this.model = model;
        this.repository = AppDataSource.getRepository(model);
    }
}