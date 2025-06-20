import { RequestHandler } from 'express';
import * as commentService from '../services/commentService';
import { toCommentResponseDTO } from '../utils/comment.mapper';
import { CreateCommentDTO, UpdateCommentDTO } from '../dtos/comment.dto';
import { CommentableTypeEnum } from '../models/enums';

export const listCommentsController: RequestHandler = async (req, res, next) => {
    try {
        const type = req.query.commentableType as CommentableTypeEnum;
        const id = Number(req.query.commentableId);
        if (!type || isNaN(id)) {
            res.status(400).json({ message: 'commentableType and commentableId are required' });
            return;
        }
        const comments = await commentService.getComments(type, id);
        res.json(comments.map(toCommentResponseDTO));
    } catch (err) {
        next(err);
    }
};

export const getCommentController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const comment = await commentService.getCommentById(id);
        res.json(toCommentResponseDTO(comment));
    } catch (err) {
        if (err instanceof Error && err.message === 'Comment not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const createCommentController: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body as CreateCommentDTO;
        const comment = await commentService.createComment(data);
        res.status(201).json(toCommentResponseDTO(comment));
    } catch (err) {
        if (err instanceof Error && ['User not found', 'Parent comment not found', 'Parent comment does not belong to same entity'].includes(err.message)) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const updateCommentController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body as UpdateCommentDTO;
        const updated = await commentService.updateComment(id, data);
        res.json(toCommentResponseDTO(updated));
    } catch (err) {
        if (err instanceof Error && err.message === 'Comment not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const deleteCommentController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await commentService.deleteComment(id);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && err.message === 'Comment not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};