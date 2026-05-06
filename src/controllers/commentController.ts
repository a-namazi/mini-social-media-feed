import { BaseController } from './baseController';
import { CommentType, CreateCommentInput } from '../models';
import { mockApi } from '../services/mock';

class CommentController extends BaseController {
    async addComment(input: CreateCommentInput): Promise<CommentType> {
        try {
            this.validateRequired(input, ['postId', 'content']);

            const newComment = await mockApi.addComment(input.postId, {
                author: 'current_user',
                content: input.content,
            });

            return newComment;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }
}

export const commentController = new CommentController();