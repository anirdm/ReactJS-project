import React, { useEffect, useState } from 'react';
import { usePosts } from '../contexts/PostContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const useGetUserLikedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState([]);
    const { posts, setPosts } = usePosts();
    const { userProfile } = useUserProfile();

    useEffect(() => {
        const getLikedPosts = async () => {
            if (!userProfile || !userProfile.likedPosts || userProfile.likedPosts.length === 0) {
                // If there are no liked posts, set an empty list and stop loading
                setLikedPosts([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setLikedPosts([]);

            try {
                const likedPostIds = userProfile.likedPosts;

                // Proceed only if likedPostIds is a non-empty array
                if (likedPostIds.length > 0) {
                    const q = query(collection(db, 'posts'), where(documentId(), 'in', likedPostIds));
                    const querySnapshot = await getDocs(q);

                    const posts = [];
                    querySnapshot.forEach(post => {
                        posts.push({ ...post.data(), id: post.id });
                    });

                    // Sort posts by createdAt timestamp, if available
                    posts.sort((a, b) => b.createdAt - a.createdAt);
                    setLikedPosts(posts);
                } else {
                    setLikedPosts([]); // In case the array is empty, return an empty array
                }
            } catch (error) {
                console.error("Error fetching liked posts: ", error);
                setLikedPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        getLikedPosts();
    }, [userProfile, setLikedPosts]);

    return { isLoading, likedPosts };
};

export default useGetUserLikedPosts;
