import { createContext, useContext, useState } from "react";

// Create the AuthContext
const PostContext = createContext();

// Custom hook to use the AuthContext
export const usePost = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {
    const [ posts, setPosts ] = useState([]);

    const createPost = (post) => {
        setPosts((prevPosts) => [post, ...prevPosts]);
    };

    // edit post

    const deletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    //add comment

    return (
        <PostContext.Provider value={{ posts, createPost, deletePost, setPosts }}>
            {children}
        </PostContext.Provider>
    );
}