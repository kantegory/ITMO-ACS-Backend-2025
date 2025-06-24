import { AppDataSource } from '../config/databaseConfig';
import {
  BookingRequest,
  BookingRequestStatus,
} from '../entities/BookingRequest';
import { UserRole } from '../entities/User';

class BookingRequestService {
  public repo = AppDataSource.getRepository(BookingRequest);

  async create(data: Partial<BookingRequest>, user: any) {
    if (!user) throw { status: 403, message: 'User not authenticated' };
    if (user.role !== UserRole.TENANT)
      throw { status: 403, message: 'Access denied' };

    const br = this.repo.create({
      ...data,
      tenant: { id: user.userId },
      status: BookingRequestStatus.CREATED,
    });
    return await this.repo.save(br);
  }

  async update(id: number, data: Partial<BookingRequest>, user: any) {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    const br = await this.repo.findOne({
      where: { id },
      relations: ['tenant', 'property', 'property.owner'],
    });
    if (!br) throw { status: 404, message: 'Booking request not found' };

    const isTenant =
      user.role === UserRole.TENANT && br.tenant.id === user.userId;
    const isLandlord =
      user.role === UserRole.LANDLORD && br.property.owner.id === user.userId;
    const isAdmin = user.role === UserRole.ADMIN;
    if (!isTenant && !isLandlord && !isAdmin)
      throw { status: 403, message: 'Forbidden' };

    await this.repo.update(id, data);
    return this.repo.findOneBy({ id });
  }

  async getAll(user: any) {
    if (!user) throw { status: 403, message: 'Forbidden' };

    const { role, userId } = user;
    if (role === UserRole.ADMIN) {
      return this.repo.find();
    }
    if (role === UserRole.LANDLORD) {
      return this.repo
        .createQueryBuilder('booking_request')
        .leftJoinAndSelect('booking_request.property', 'property')
        .where('property.owner_id = :userId', { userId })
        .getMany();
    }
    return this.repo.find({ where: { tenant: { id: userId } } });
  }

  async getById(id: number, user: any) {
    if (!user) throw { status: 403, message: 'Forbidden' };

    const { role, userId } = user;
    if (role === UserRole.ADMIN) {
      return this.repo.findOne({ where: { id } });
    }
    if (role === UserRole.LANDLORD) {
      return this.repo
        .createQueryBuilder('booking_request')
        .leftJoinAndSelect('booking_request.property', 'property')
        .where('property.owner_id = :userId', { userId })
        .andWhere('booking_request.id = :id', { id })
        .getOne();
    }
    return this.repo.findOne({ where: { id, tenant: { id: userId } } });
  }
}

export default new BookingRequestService();
