import { BaseController } from './baseController';
import { PostType, CreatePostInput } from '../models';
import { mockApi } from '../services/mock';

class PostController extends BaseController {
    async getFeed(): Promise<PostType[]> {
        try {
            const posts = await mockApi.getPosts();
            return posts;
        } catch (error) {
            this.handleError(error);
            return [];
        }
    }

    async createPost(input: CreatePostInput): Promise<PostType> {
        try {
            this.validateRequired(input, ['content']);

            const newPost = await mockApi.createPost({
                usertag: 'current_user',
                content: input.content,
            });

            return newPost; 
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async likePost(postId: string): Promise<{ likeCount: number; likedByUser: boolean }> {
        try {
            this.validateRequired({ postId }, ['postId']);
            const result = await mockApi.toggleLike(postId);
            return result;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }
}

export const postController = new PostController();