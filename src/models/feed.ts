export type CommentType = {
    id: string;
    author: string;
    authorAvatar?: string;
    content: string;
    createdAt: Date;
};

export type PostType = {
    id: string;
    username: string;
    usertag: string;
    userAvatar: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByUser: boolean;
    commentCount: number;
    comments: CommentType[];
};

export type CreatePostInput = {
    content: string;
};

export type CreateCommentInput = {
    postId: string;
    content: string;
};