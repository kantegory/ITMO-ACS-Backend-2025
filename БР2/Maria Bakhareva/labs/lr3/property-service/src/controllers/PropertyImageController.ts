import { BaseController } from './BaseController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import PropertyImageService from '../services/PropertyImageService';
import { PropertyImage } from '../entities/PropertyImage';
import { Request, Response } from 'express';

export class PropertyImageController extends BaseController<PropertyImage> {
  constructor() {
    super(PropertyImageService.repo);
  }

  uploadImages = [
    upload.array('images', 10),
    async (req: Request, res: Response) => {
      try {
        const imgs = await PropertyImageService.addImages(
          req.payload,
          Number(req.body.propertyId),
          req.files as Express.Multer.File[],
        );
        res.status(201).json(imgs);
      } catch (err: any) {
        console.error(err);
        res
          .status(err.status || 500)
          .json({ error: err.message || 'Internal server error' });
      }
    },
  ];

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const propertyId = Number(req.query.propertyId);
      if (isNaN(propertyId)) {
        res.status(400).json({ error: 'propertyId query parameter is required' });
        return;
      }
      const images = await PropertyImageService.getByProperty(propertyId);
      res.status(200).json(images);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const propertyId = parseInt(req.params.propertyId, 10);
      if (isNaN(propertyId)) {
        res.status(400).json({ error: 'Invalid propertyId' });
        return;
      }
      const images = await PropertyImageService.getByProperty(propertyId);
      res.status(200).json(images);
      return;
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

const uploadDir = path.join(__dirname, '../../uploads/property-images');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) =>
    cb(null, randomUUID() + path.extname(file.originalname)),
});

export const upload = multer({ storage });
