import { AppDataSource } from '../config/databaseConfig';
import { Property } from '../entities/Property';
import { PropertyImage } from '../entities/PropertyImage';
import { BaseController } from './BaseController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

export const PropertyImageController = new BaseController(
  AppDataSource.getRepository(PropertyImage),
);

const uploadDir = path.join(__dirname, '../../uploads/property-images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
export const upload = multer({ storage });

PropertyImageController.uploadImages = [
  upload.array('images', 10),
  async (req: Request, res: Response) => {
    try {
      const user = req.payload;
      const propertyId = req.body.propertyId;

      if (!user || user.role !== 'landlord') {
        res.status(403).json({ error: 'Only landlords can add images' });
        return;
      }

      const propertyRepo = AppDataSource.getRepository(Property);
      const property = await propertyRepo.findOne({
        where: { id: propertyId },
        relations: ['owner'],
      });

      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }

      if (property.owner.id !== user.userId) {
        res
          .status(403)
          .json({ error: 'You are not the owner of this property' });
        return;
      }

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        res.status(400).json({ error: 'No images uploaded' });
        return;
      }

      const imageRepo = AppDataSource.getRepository(PropertyImage);
      const images = [];
      for (const file of req.files) {
        const image = imageRepo.create({
          property,
          url: `/uploads/property-images/${file.filename}`,
        });
        await imageRepo.save(image);
        images.push(image);
      }

      res.status(201).json(images);
    } catch (error) {
      console.error('Error in uploadImages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
];

PropertyImageController.getAll = async (req, res) => {
  try {
    const propertyId = req.query.propertyId;
    if (!propertyId) {
      res.status(400).json({ error: 'propertyId query parameter is required' });
      return;
    }

    const imageRepo = AppDataSource.getRepository(PropertyImage);
    const images = await imageRepo.find({
      where: { property: { id: Number(propertyId) } },
      relations: ['property'],
    });

    res.status(200).json(images);
  } catch (error) {
    console.error('Error in getAll images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
