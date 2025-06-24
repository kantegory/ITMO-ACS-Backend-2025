import { CommentableTypeEnum } from '../models/enums';

export interface CommentResponseDTO {
    id: number;
    commentableType: CommentableTypeEnum;
    commentableId: number;
    userId: number;
    parentId?: number;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CreateCommentDTO {
    commentableType: CommentableTypeEnum;
    commentableId: number;
    userId: number;
    parentId?: number;
    content: string;
}

export interface UpdateCommentDTO {
    content: string;
}