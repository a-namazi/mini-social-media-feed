import React from 'react';
import { PostType } from '../models';
import { Avatar } from './Avatar';
import { CommentSection } from './CommentSection';
import { formatRelativeTime } from '@/utils/utility';

interface PostProps {
    post: PostType;
    onLike: (postId: string) => Promise<void>;
    onAddComment: (postId: string, content: string) => Promise<void>;
}

export const Post: React.FC<PostProps> = ({ post, onLike, onAddComment }) => {

    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 mb-4">
            <div className="flex space-x-3">
                <Avatar src={post.userAvatar} alt={post.username} />
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold hover:underline cursor-pointer text-gray-900">
                            {post.username}
                        </span>
                        <span className="text-gray-500 text-xs">@{post.username}</span>
                        <span className="text-gray-500 text-sm">
                            {formatRelativeTime(post.createdAt)}
                        </span>
                    </div>

                    <p className="text-gray-800 mb-3 whitespace-pre-wrap break-all">
                        {post.content}
                    </p>

                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => onLike(post.id)}
                            className={`flex items-center space-x-2 transition-colors ${post.likedByUser
                                ? 'text-red-500 '
                                : 'text-gray-500 hover:text-red-500'
                                }`}
                        >
                            <svg
                                className={`w-5 h-5 transition-transform ${post.likedByUser ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current'
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-sm">{post.likeCount}</span>
                        </button>

                        <div className="flex items-center space-x-2 text-gray-500">
                            <svg
                                className="w-5 h-5 stroke-current fill-none"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-sm">{post.commentCount}</span>
                        </div>
                    </div>

                    <CommentSection
                        comments={post.comments}
                        postId={post.id}
                        onAddComment={onAddComment}
                    />
                </div>
            </div>
        </article>
    );
};