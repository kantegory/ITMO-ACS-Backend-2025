import { AppDataSource } from '../config/databaseConfig';
import { Favorite } from '../entities/Favorite';
import { UserRole } from '../entities/UserRole';

class FavoriteService {
  public repo = AppDataSource.getRepository(Favorite);

  async create(payload: any, propertyId: number) {
    if (!payload) throw { status: 401, message: 'Unauthorized' };
    if (payload.role !== UserRole.TENANT)
      throw { status: 403, message: 'Forbidden' };
    if (!propertyId) throw { status: 400, message: 'Property ID is required' };

    const exists = await this.repo.findOne({
      where: { userId: payload.userId, property: { id: propertyId } },
    });
    if (exists) throw { status: 409, message: 'Favorite already exists' };

    const fav = this.repo.create({
      userId: payload.userId,
      property: { id: propertyId },
    });
    return this.repo.save(fav);
  }

  async getAll(payload: any) {
    if (!payload) throw { status: 401, message: 'Unauthorized' };
    if (payload.role !== UserRole.TENANT)
      throw { status: 403, message: 'Forbidden' };

    return this.repo.find({
      where: { userId: payload.userId },
      relations: ['property'],
    });
  }
}

export default new FavoriteService();
