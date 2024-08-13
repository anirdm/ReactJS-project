import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { usePosts } from '../contexts/PostContext';

const useEditPost = () => {
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const { posts, setPosts } = usePosts();

    const editPost = async (postId, updatedData) => {
        setIsUpdating(true);
        const postDocRef = doc(db, 'posts', postId);

        try {
            await updateDoc(postDocRef, updatedData);

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, ...updatedData } : post
                )
            );
        } catch (error) {
            setError(error.message);
            return;
        } finally {
            setIsUpdating(false);
        }
    };

    return { editPost, error, isUpdating };
};

export default useEditPost;
