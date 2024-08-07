import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            setAllPosts([]);

            try {
                const q = query(collection(db, 'posts'));
                const querySnapshot = await getDocs(q);

                const allPosts = [];
                querySnapshot.forEach(post => {
                    allPosts.push({ ...post.data(), id: post.id });
                });

                // Sort posts to have the latest post at the top
                allPosts.sort((a, b) => b.createdAt - a.createdAt);
                setAllPosts(allPosts);
            } catch (error) {
                setAllPosts([]);
            } finally {
                setIsLoading(false);
            }
        };



        getAllPosts();
    }, [setAllPosts]);

    const getPostById = (id) => {
        return allPosts.find(post => post.id === id);
    };

    return { isLoading, allPosts, getPostById };
};

export default useGetAllPosts;
