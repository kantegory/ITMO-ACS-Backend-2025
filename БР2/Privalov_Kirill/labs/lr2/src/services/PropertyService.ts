import { AppDataSource } from '../config/databaseConfig';
import { Property } from '../entities/Property';
import { UserRole } from '../entities/User';

class PropertyService {
  public repo = AppDataSource.getRepository(Property);

  async create(user: any, data: Partial<Property>) {
    if (!user) throw { status: 403, message: 'User not authenticated' };
    if (user.role !== UserRole.LANDLORD)
      throw { status: 403, message: 'Access denied' };

    const exists = await this.repo.findOne({
      where: { title: data.title, owner: { id: user.userId } },
    });
    if (exists) throw { status: 409, message: 'Property already exists' };

    const prop = this.repo.create({ ...data, owner: { id: user.userId } });
    return this.repo.save(prop);
  }

  async getAll(user: any) {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    if (user.role === UserRole.LANDLORD) {
      return this.repo.find({
        where: { owner: { id: user.userId } },
        relations: ['owner'],
      });
    }
    return this.repo.find({ relations: ['owner'] });
  }

  async getById(user: any, id: number) {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    const prop = await this.repo.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!prop) throw { status: 404, message: 'Property not found' };

    if (user.role === UserRole.LANDLORD && prop.owner.id !== user.userId) {
      throw { status: 403, message: 'Access denied' };
    }
    return prop;
  }
}

export default new PropertyService();
