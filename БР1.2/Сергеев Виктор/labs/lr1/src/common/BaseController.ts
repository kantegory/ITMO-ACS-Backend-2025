import { BaseService } from "./BaseService";

export class BaseController<T> {
    protected service: BaseService<T>
    protected model: new () => T;

    constructor(model: new () => T) {
        this.model = model;
        this.service = new BaseService<T>(model);
    }
}