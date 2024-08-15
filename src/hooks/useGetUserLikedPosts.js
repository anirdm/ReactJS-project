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
                setLikedPosts([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setLikedPosts([]);

            try {
                const likedPostIds = userProfile.likedPosts;

                if (likedPostIds.length > 0) {
                    const q = query(collection(db, 'posts'), where(documentId(), 'in', likedPostIds));
                    const querySnapshot = await getDocs(q);

                    const posts = [];
                    querySnapshot.forEach(post => {
                        posts.push({ ...post.data(), id: post.id });
                    });

                    posts.sort((a, b) => b.createdAt - a.createdAt);
                    setLikedPosts(posts);
                } else {
                    setLikedPosts([]); 
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
