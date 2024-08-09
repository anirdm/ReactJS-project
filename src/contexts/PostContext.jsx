import { createContext, useContext, useState } from "react";

// Create the AuthContext
const PostContext = createContext();

// Custom hook to use the AuthContext
export const usePosts = () => {
    return useContext(PostContext);
}

export const PostProvider = ({ children }) => {
    const [ posts, setPosts ] = useState([]);

    const createPost = (post) => {
        setPosts((prevPosts) => [post, ...prevPosts]);
    };

    const editPost = (id, updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === id ? { ...post, ...updatedPost } : post
            )
        );
    };

    const deletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    const addComment = (postId, comment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [comment, ...post.comments],
                    };
                }
                return post;
            })
        );
    };

    return (
        <PostContext.Provider value={{ posts, createPost, deletePost, editPost, addComment, setPosts }}>
            {children}
        </PostContext.Provider>
    );
}