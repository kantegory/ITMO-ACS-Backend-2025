import { AppDataSource } from '../config/databaseConfig';
import { Complaint, ComplaintStatus } from '../entities/Complaint';
import { Property } from '../entities/Property';
import { User, UserRole } from '../entities/User';

class ComplaintService {
  public repo = AppDataSource.getRepository(Complaint);
  private propertyRepo = AppDataSource.getRepository(Property);
  private userRepo = AppDataSource.getRepository(User);

  async create(payload: any, message: string, propertyId: number) {
    if (!payload) throw { status: 401, message: 'Unauthorized' };
    if (payload.role !== UserRole.TENANT) {
      throw { status: 403, message: 'Only tenants can create complaints' };
    }
    if (!message || !propertyId) {
      throw { status: 400, message: 'Message and propertyId are required' };
    }

    const property = await this.propertyRepo.findOneBy({ id: propertyId });
    if (!property) throw { status: 404, message: 'Property not found' };

    const user = await this.userRepo.findOneBy({ id: payload.userId });
    if (!user) throw { status: 404, message: 'User not found' };

    const complaint = this.repo.create({
      message,
      property,
      user,
      status: ComplaintStatus.CREATED,
    });
    return this.repo.save(complaint);
  }

  async getAll(payload: any) {
    if (!payload) throw { status: 401, message: 'Unauthorized' };
    const { role, userId } = payload;

    if (role === UserRole.ADMIN) {
      return this.repo.find();
    } else if (role === UserRole.LANDLORD) {
      return this.repo
        .createQueryBuilder('complaint')
        .leftJoinAndSelect('complaint.property', 'property')
        .where('property.owner_id = :userId', { userId })
        .getMany();
    } else if (role === UserRole.TENANT) {
      return this.repo.find({ where: { user: { id: userId } } });
    } else {
      throw { status: 403, message: 'Access denied' };
    }
  }

  async getById(payload: any, id: number) {
    if (!payload) throw { status: 401, message: 'Unauthorized' };
    const { role, userId } = payload;

    if (role === UserRole.ADMIN) {
      const c = await this.repo.findOneBy({ id });
      if (!c) throw { status: 404, message: 'Complaint not found' };
      return c;
    }

    if (role === UserRole.LANDLORD) {
      const c = await this.repo
        .createQueryBuilder('complaint')
        .leftJoinAndSelect('complaint.property', 'property')
        .where('property.owner_id = :userId', { userId })
        .andWhere('complaint.id = :id', { id })
        .getOne();
      if (!c) throw { status: 404, message: 'Complaint not found' };
      return c;
    }

    if (role === UserRole.TENANT) {
      const c = await this.repo.findOne({
        where: { id, user: { id: userId } },
      });
      if (!c) throw { status: 404, message: 'Complaint not found' };
      return c;
    }

    throw { status: 403, message: 'Access denied' };
  }
}

export default new ComplaintService();
