import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { usePosts } from '../contexts/PostContext';

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePosts();

    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            setPosts([]);

            try {
                const q = query(collection(db, 'posts'));
                const querySnapshot = await getDocs(q);

                const posts = [];
                querySnapshot.forEach(post => {
                    posts.push({ ...post.data(), id: post.id });
                });

                // Sort posts to have the latest post at the top
                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (error) {
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        getAllPosts();
    }, [setPosts]);

    const getPostById = (id) => {
        return posts.find(post => post.id === id);
    };

    return { isLoading, posts, getPostById };
};

export default useGetAllPosts;
