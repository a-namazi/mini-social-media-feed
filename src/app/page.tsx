'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '../components/Post';
import { PostComposer } from '../components/PostComposer';
import { PostType } from '../models';
import { postController, commentController } from '../controllers';

export default function Page() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = async () => {
        try {
            setLoading(true);
            const feed = await postController.getFeed();
            setPosts(feed);
        } catch (error) {
            console.error('Error loading feed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (content: string ) => {
        try {
            const newPost = await postController.createPost({ content });
            setPosts(prev => [newPost, ...prev]);
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };

    const handleLike = async (postId: string) => {
        try {
            const result = await postController.likePost(postId);
            setPosts(prev => prev.map(post =>
                post.id === postId
                    ? { ...post, ...result }
                    : post
            ));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleAddComment = async (postId: string, content: string) => {
        try {
            await commentController.addComment({ postId, content });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto p-4">
                    <div className="text-center text-gray-500">Loading feed...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 transition-colors">
            <div className="max-w-2xl mx-auto">
                <div className="">
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-2xl font-bold text-gray-900">✨ Mini Feed</h1>
                    </div>
                    <PostComposer onSubmit={handleCreatePost} />
                </div>

                <div>
                    {posts.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            No posts yet. Be the first to post!
                        </div>
                    ) : (
                        posts.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                onLike={handleLike}
                                onAddComment={handleAddComment}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}