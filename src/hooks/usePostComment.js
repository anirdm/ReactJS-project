import React, { useState } from 'react'
import { useUserAuth } from '../contexts/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { usePosts } from '../contexts/PostContext';

const usePostComment = () => {
    const { user } = useUserAuth();
    const { addComment } = usePosts();

    const [isCommenting, setIsCommenting] = useState(false);
    const [error, setError] = useState(false);

    const handlePostComment = async (postId, comment) => {
        if(isCommenting) return;

        setIsCommenting(true);

        const newComment = {
            comment,
            createdBy: user.uid,
            createdAt: Date.now(),
            postId
        }

        try {
            await updateDoc(doc(db, 'posts', postId), {
                comments: arrayUnion(newComment)
            });


            addComment(postId, newComment);
        } catch (error) {
            setError(error);
        } finally {
            setIsCommenting(false);
        }
    }

    return { isCommenting, handlePostComment };
}

export default usePostComment;
