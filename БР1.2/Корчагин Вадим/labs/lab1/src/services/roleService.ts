import { BaseService } from "../common/baseService";
import { Role } from "../entities/Role";

export class RoleService extends BaseService<Role> {
  constructor() {
    super(Role);
  }
}
