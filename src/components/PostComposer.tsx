import React, { useState } from 'react';
import { Avatar } from './Avatar';

interface PostComposerProps {
    onSubmit: (content: string) => Promise<void>;
    currentUserAvatar?: string;
}

export const PostComposer: React.FC<PostComposerProps> = ({
    onSubmit,
    currentUserAvatar = '0.jpg'
}) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const MAX_CHARS = 280;
    const remaining = MAX_CHARS - content.length;
    const isOverLimit = remaining < 0;

    const handleSubmit = async () => {
        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(content);
            setContent('');
        } catch (error) {
            console.error('Error posting:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
            <div className="flex space-x-3">
                <Avatar src={currentUserAvatar} alt="Current user" />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What's happening?"
                        rows={3}
                        className="w-full px-3 py-2 text-lg border-none focus:outline-none resize-none bg-transparent text-gray-900 placeholder-gray-500"
                        disabled={isSubmitting}
                    />
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-xs">
                            <span className={`font-mono ${remaining < 20
                                ? (remaining < 0 ? 'text-red-500' : 'text-orange-500')
                                : 'text-gray-400'
                                }`}>
                                {remaining}
                            </span>
                            <span className="text-gray-400">characters left</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim() || isSubmitting || isOverLimit}
                            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};