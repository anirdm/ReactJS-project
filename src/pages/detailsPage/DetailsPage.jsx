import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../services/fetchPosts";
import PostCard from "../../components/postCard/PostCard";
import { usePosts } from "../../contexts/PostContext";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const DetailsPage = () => {
  const { _id } = useParams(); // Extract post ID from URL
  const { isLoading, getPostById } = useGetUserPosts();

   // Retrieve the post by ID
   const post = !isLoading ? getPostById(_id) : null;

   console.log(post);

   if (isLoading) {
      return ;
   }

  return (
    <div className="flex justify-center">

      <PostCard post={post}/>
    </div>
  )
}

export default DetailsPage;
