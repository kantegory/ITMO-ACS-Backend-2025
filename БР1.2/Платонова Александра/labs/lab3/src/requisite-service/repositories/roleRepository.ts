import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../models/role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    async findByName(name: string): Promise<Role | undefined> {
        return this.findOne({ where: { name } });
    }

    async createRole(name: string): Promise<Role> {
        const role = this.create({ name });
        return this.save(role);
    }
}