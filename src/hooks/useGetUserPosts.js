import React, { useEffect, useState } from 'react'
import { usePosts } from '../contexts/PostContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const useGetUserPosts = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const { posts, setPosts } = usePosts();
    const { userProfile } = useUserProfile();

    useEffect(() => {
        const getPosts = async () => {
            if(!userProfile) return;

            setIsLoading(true);
            setPosts([]);

            try {
                const q = query(collection(db, 'posts'), where('createdBy', '==', userProfile.uid ));
                const querySnapshot = await getDocs(q);

                const posts = [];

                querySnapshot.forEach(post => {
                    posts.push({...post.data(), id: post.id})
                })

                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (error) {
                setPosts([]);
            } finally { 
                setIsLoading(false);
            }
        }

        getPosts();
    }, [setPosts, userProfile]);

    const getPostById = (id) => {
        if(isLoading) {
            return null;
        }
        
        return posts.find(post => post.id === id);
    };

    return { isLoading, posts, getPostById };
}


export default useGetUserPosts;
