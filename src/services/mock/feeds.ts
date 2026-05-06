import { generateId } from '@/utils/utility';
import { PostType, CommentType } from '../../models';

interface User {
    name: string;
    id: string;
    avatar: string;
}

const users: Record<string, User> = {
    jane_smith: {
        name: "Jane Smith",
        id: "jane_smith",
        avatar: "4.jpg"
    },
    bob_wilson: {
        name: "Bob Wilson",
        id: "bob_wilson",
        avatar: "3.jpg"
    },
    alex_johnson: {
        name: "Alex Johnson",
        id: "alex_johnson",
        avatar: "7.jpg"
    },
    sarah_parker: {
        name: "Sarah Parker",
        id: "sarah_parker",
        avatar: "5.jpg"
    },
    mike_brown: {
        name: "Mike Brown",
        id: "mike_brown",
        avatar: "8.jpg"
    },
    tech_tips: {
        name: "Tech Tips",
        id: "tech_tips",
        avatar: "6.jpg"
    },
    current_user: {
        name: "User",
        id: "current_user",
        avatar: "0.jpg"
    }
}


const mockComments: CommentType[] = [
    {
        id: generateId(),
        author: users["jane_smith"].name,
        authorAvatar: users['jane_smith'].avatar,
        content: 'Great post! Really enjoyed reading this.',
        createdAt: new Date(Date.now() - 3600000),
    },
    {
        id: generateId(),
        author: users['bob_wilson'].name,
        authorAvatar: users['bob_wilson'].avatar,
        content: 'Thanks for sharing this!',
        createdAt: new Date(Date.now() - 7200000),
    },
];

export const mockPosts: PostType[] = [
    {
        id: generateId(),
        username: users['alex_johnson'].name,
        usertag: users['alex_johnson'].id,
        userAvatar: users['alex_johnson'].avatar,
        content: 'Just launched a new project! 🚀 Excited to share it with everyone. #coding #webdev',
        createdAt: new Date(Date.now() - 3600000),
        likeCount: 42,
        likedByUser: false,
        commentCount: 2,
        comments: mockComments,
    },
    {
        id: generateId(),
        username: users['sarah_parker'].name,
        usertag: users['sarah_parker'].id,
        userAvatar: users['sarah_parker'].avatar,
        content: 'Beautiful sunrise this morning! ☀️ Starting the day with gratitude.',
        createdAt: new Date(Date.now() - 86400000),
        likeCount: 128,
        likedByUser: true,
        commentCount: 1,
        comments: [
            {
                id: generateId(),
                author: users['mike_brown'].name,
                authorAvatar: users['mike_brown'].avatar,
                content: 'Stunning view! Where is this?',
                createdAt: new Date(Date.now() - 86000000),
            },
        ],
    },
    {
        id: generateId(),
        username: users['tech_tips'].name,
        usertag: users['tech_tips'].id,
        userAvatar: users['tech_tips'].avatar,
        content: 'React Tip: Always use functional components with hooks instead of class components for better code organization and reusability! 💡',
        createdAt: new Date(Date.now() - 172800000),
        likeCount: 267,
        likedByUser: false,
        commentCount: 0,
        comments: [],
    },
];

// Simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    async getPosts(): Promise<PostType[]> {
        await delay(500);
        return [...mockPosts];
    },

    async createPost(post: Omit<PostType, 'id' | 'username' | 'userAvatar' | 'createdAt' | 'likeCount' | 'likedByUser' | 'commentCount' | 'comments'>): Promise<PostType> {
        await delay(300);
        const newPost: PostType = {
            ...post,
            username: users[post.usertag].name,
            usertag: users[post.usertag].id,
            userAvatar: users[post.usertag].avatar,
            id: generateId(),
            createdAt: new Date(),
            likeCount: 0,
            likedByUser: false,
            commentCount: 0,
            comments: [],
        };
        mockPosts.unshift(newPost);
        return newPost;
    },

    async toggleLike(postId: string): Promise<{ likeCount: number; likedByUser: boolean }> {
        await delay(200);
        const post = mockPosts.find(p => p.id === postId);
        if (!post) throw new Error('Post not found');

        post.likedByUser = !post.likedByUser;
        post.likeCount += post.likedByUser ? 1 : -1;

        return { likeCount: post.likeCount, likedByUser: post.likedByUser };
    },

    async addComment(postId: string, comment: Omit<CommentType, 'id' | 'createdAt'>): Promise<CommentType> {
        await delay(300);
        const post = mockPosts.find(p => p.id === postId);
        if (!post) throw new Error('Post not found');

        const newComment: CommentType = {
            ...comment,
            id: generateId(),
            author: users[comment.author].name,
            authorAvatar: users[comment.author].avatar,
            createdAt: new Date(),
        };

        post.comments.unshift(newComment);
        post.commentCount++;

        return newComment;
    },
};