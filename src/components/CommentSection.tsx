import React, { SubmitEvent, useState } from 'react';
import { CommentType } from '../models';
import { Avatar } from './Avatar';
import { formatRelativeTime } from '@/utils/utility';

interface CommentSectionProps {
    comments: CommentType[];
    postId: string;
    onAddComment: (postId: string, content: string) => Promise<void>;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
    comments,
    postId,
    onAddComment
}) => {
    const [commentContent, setCommentContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!commentContent.trim() || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await onAddComment(postId, commentContent);
            if(!showComments)
                setShowComments(true)
            setCommentContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-3">
            <form onSubmit={handleSubmit} className="flex items-start gap-2 mt-1">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                        maxLength={280}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!commentContent.trim()}
                    className="cursor-pointer px-4 py-1.5 text-sm font-semibold rounded-full bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                >
                    Reply
                </button>
            </form>

            {comments.length > 0 ? <button
                onClick={() => setShowComments(!showComments)}
                className="cursor-pointer text-xs text-gray-500 font-medium mt-2 flex items-center gap-1 hover:text-blue-600 transition"
            >
                {showComments ? "▼ Hide comments" : `▶️ View ${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
            </button> : null}
            {showComments && (
                <div className="mt-3 space-y-3">
                    <div className="space-y-3">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-2">
                                <Avatar
                                    src={comment.authorAvatar || '0.jpg'}
                                    alt={comment.author}
                                    size="sm"
                                />
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-semibold text-sm text-gray-900">
                                                {comment.author}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatRelativeTime(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-800 break-all">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};