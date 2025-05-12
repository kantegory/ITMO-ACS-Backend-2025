import { AppDataSource } from '../config/databaseConfig';
import { Property } from '../entities/Property';
import { PropertyImage } from '../entities/PropertyImage';
import { UserRole } from '../entities/User';

class PropertyImageService {
  private imageRepo = AppDataSource.getRepository(PropertyImage);
  private propertyRepo = AppDataSource.getRepository(Property);

  async addImages(user: any, propertyId: number, files: Express.Multer.File[]) {
    if (!user || user.role !== UserRole.LANDLORD) {
      throw { status: 403, message: 'Only landlords can add images' };
    }

    const property = await this.propertyRepo.findOne({
      where: { id: propertyId },
      relations: ['owner'],
    });
    if (!property) {
      throw { status: 404, message: 'Property not found' };
    }
    if (property.owner.id !== user.userId) {
      throw { status: 403, message: 'You are not the owner of this property' };
    }
    if (!files || files.length === 0) {
      throw { status: 400, message: 'No images uploaded' };
    }

    const saved: PropertyImage[] = [];
    for (const file of files) {
      const img = this.imageRepo.create({
        property,
        url: `/uploads/property-images/${file.filename}`,
      });
      await this.imageRepo.save(img);
      saved.push(img);
    }
    return saved;
  }

  async getByProperty(propertyId: number) {
    return this.imageRepo.find({
      where: { property: { id: propertyId } },
      relations: ['property'],
    });
  }
}

export default new PropertyImageService();
