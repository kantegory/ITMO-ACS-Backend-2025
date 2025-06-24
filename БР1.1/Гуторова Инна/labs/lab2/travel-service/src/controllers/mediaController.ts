import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Media from '../entities/Media';

export const createMedia = async (req: Request, res: Response) => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const newMedia = mediaRepository.create(req.body);
    await mediaRepository.save(newMedia);
    res.status(201).json(newMedia);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedia = async (req: Request, res: Response) => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.find({ relations: ['route', 'attraction'] });
    res.json(media);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMediaById = async (req: Request, res: Response) => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.findOne({
      where: { media_id: parseInt(req.params.id) },
      relations: ['route', 'attraction']
    });
    media ? res.json(media) : res.status(404).json({ message: 'Media not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedia = async (req: Request, res: Response): Promise<any> => {
  try {
    const mediaRepository = AppDataSource.getRepository(Media);
    const media = await mediaRepository.findOneBy({ media_id: parseInt(req.params.id) });
    if (!media) return res.status(404).json({ message: 'Media not found' });
    mediaRepository.merge(media, req.body);
    const result = await mediaRepository.save(media);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Media).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Media deleted' })
      : res.status(404).json({ message: 'Media not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};