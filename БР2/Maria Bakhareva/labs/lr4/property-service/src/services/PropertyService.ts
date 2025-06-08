import { AppDataSource } from '../config/databaseConfig';
import { Property } from '../entities/Property';
import { UserRole } from '../entities/UserRole';

class PropertyService {
  public repo = AppDataSource.getRepository(Property);

  async create(user: any, data: Partial<Property>) {
    if (!user) throw { status: 403, message: 'User not authenticated' };
    if (user.role !== UserRole.LANDLORD)
      throw { status: 403, message: 'Access denied' };

    const exists = await this.repo.findOne({
      where: { title: data.title, ownerId: user.userId },
    });
    if (exists) throw { status: 409, message: 'Property already exists' };

    const prop = this.repo.create({ ...data, ownerId: user.userId });
    return this.repo.save(prop);
  }

  async getAll(user: any) {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    if (user.role === UserRole.LANDLORD) {
      return this.repo.find({
        where: {
          ownerId: user.userId
        },
      });
    }
    return this.repo.find();
  }

  async getById(user: any, id: number) {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    const prop = await this.repo.findOne({
      where: { id },
    });
    if (!prop) throw { status: 404, message: 'Property not found' };

    if (user.role === UserRole.LANDLORD && prop.ownerId !== user.userId) {
      throw { status: 403, message: 'Access denied' };
    }
    return prop;
  }
}

export default new PropertyService();
