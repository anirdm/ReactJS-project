import React, { useState } from 'react'
import { useUserAuth } from '../contexts/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { usePosts } from '../contexts/PostContext';

const useLikePost = (post) => {
    const { toggleLike } = usePosts();
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const { user } = useUserAuth();
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?.uid));
    const [error, setError] = useState(false);

    const handleLikePost = async () => {
        if(isUpdating) return;

        try {
            const postRef = doc(db, 'posts', post.id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })
    
            setIsLiked(!isLiked);
            setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));

            // UI
            toggleLike(post.id, user.uid, isLiked);
        } catch (error) {
            setError(error);
        } finally {
            setIsUpdating(false);
        }
    }

    return { isLiked, likes, handleLikePost, error };
}

export default useLikePost;
