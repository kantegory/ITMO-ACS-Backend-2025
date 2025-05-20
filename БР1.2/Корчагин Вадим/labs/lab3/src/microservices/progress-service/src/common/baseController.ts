import { BaseService } from "./baseService";

export abstract class BaseController<Entity> {
  protected service: BaseService<Entity>;

  constructor(service: BaseService<Entity>) {
    this.service = service;
  }

  protected getRelations(): string[] {
    return []; 
  }
}
