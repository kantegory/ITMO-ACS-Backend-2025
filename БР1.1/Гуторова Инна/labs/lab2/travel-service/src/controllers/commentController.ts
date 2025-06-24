import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Comment from '../entities/Comment';

export const createComment = async (req: Request, res: Response) => {
  try {
    const commentRepository = AppDataSource.getRepository(Comment);
    const newComment = commentRepository.create(req.body);
    await commentRepository.save(newComment);
    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comments = await commentRepository.find({ relations: ['user', 'route'] });
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({
      where: { comment_id: parseInt(req.params.id) },
      relations: ['user', 'route']
    });
    comment ? res.json(comment) : res.status(404).json({ message: 'Comment not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOneBy({ comment_id: parseInt(req.params.id) });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    commentRepository.merge(comment, req.body);
    const result = await commentRepository.save(comment);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Comment).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'Comment deleted' })
      : res.status(404).json({ message: 'Comment not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};