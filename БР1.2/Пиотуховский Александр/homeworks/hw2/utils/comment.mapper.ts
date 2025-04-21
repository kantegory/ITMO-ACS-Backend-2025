import { Comment } from '../models/Comment';
import { CommentResponseDTO } from '../dtos/comment.dto';

export function toCommentResponseDTO(comment: Comment): CommentResponseDTO {
    return {
        id: comment.id,
        commentableType: comment.commentableType,
        commentableId: comment.commentableId,
        userId: comment.user.id,
        parentId: comment.parent ? comment.parent.id : undefined,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt ?? undefined,
    };
}