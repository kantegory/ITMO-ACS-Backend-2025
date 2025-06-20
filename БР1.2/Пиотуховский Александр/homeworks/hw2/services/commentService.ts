import { AppDataSource } from '../config/data-source';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import { CreateCommentDTO, UpdateCommentDTO } from '../dtos/comment.dto';
import { CommentableTypeEnum } from '../models/enums';

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);

export async function getComments(
    commentableType: CommentableTypeEnum,
    commentableId: number
): Promise<Comment[]> {
    return commentRepository.find({
        where: { commentableType, commentableId },
        relations: ['user', 'parent'],
        order: { createdAt: 'ASC' },
    });
}

export async function getCommentById(id: number): Promise<Comment> {
    const comment = await commentRepository.findOne({
        where: { id },
        relations: ['user', 'parent'],
    });
    if (!comment) throw new Error('Comment not found');
    return comment;
}

export async function createComment(
    data: CreateCommentDTO
): Promise<Comment> {
    const { commentableType, commentableId, userId, parentId, content } = data;

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let parent: Comment | undefined;
    if (parentId !== undefined) {
        parent = await commentRepository.findOne({ where: { id: parentId } });
        if (!parent) throw new Error('Parent comment not found');
        if (parent.commentableType !== commentableType || parent.commentableId !== commentableId) {
            throw new Error('Parent comment does not belong to same entity');
        }
    }

    const comment = commentRepository.create({
        commentableType,
        commentableId,
        user,
        parent,
        content,
    });
    return commentRepository.save(comment);
}

export async function updateComment(
    id: number,
    data: UpdateCommentDTO
): Promise<Comment> {
    const comment = await commentRepository.findOne({ where: { id }, relations: ['user', 'parent'] });
    if (!comment) throw new Error('Comment not found');
    comment.content = data.content;
    comment.updatedAt = new Date();
    return commentRepository.save(comment);
}

export async function deleteComment(id: number): Promise<void> {
    const result = await commentRepository.delete(id);
    if (!result.affected) throw new Error('Comment not found');
}
