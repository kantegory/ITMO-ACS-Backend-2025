import { AppDataSource } from '../config/databaseConfig';
import { Property } from '../entities/Property';
import { BaseController } from './BaseController';

export const PropertyController = new BaseController(
  AppDataSource.getRepository(Property),
);
PropertyController.getAll = async (req, res) => {
  try {
    const user = req.payload;
    const propertyRepo = AppDataSource.getRepository(Property);

    if (!user) {
      res.status(403).json({ error: 'User not authenticated' });
      return;
    }

    let properties;
    if (user.role === 'landlord') {
      properties = await propertyRepo.find({
        where: { owner: { id: user.userId } },
        relations: ['owner'],
      });
    } else {
      properties = await propertyRepo.find({ relations: ['owner'] });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in getAll:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

PropertyController.getById = async (req, res) => {
  try {
    const user = req.payload;
    const propertyId = req.params.id;
    const propertyRepo = AppDataSource.getRepository(Property);

    if (!user) {
      res.status(403).json({ error: 'User not authenticated' });
      return;
    }

    const property = await propertyRepo.findOne({
      where: { id: Number(propertyId) },
      relations: ['owner'],
    });

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    if (user.role === 'landlord' && property.owner.id !== user.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error in getById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
