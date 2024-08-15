import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../services/fetchPosts";
import PostCard from "../../components/postCard/PostCard";
import { usePosts } from "../../contexts/PostContext";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import useGetPostOwner from "../../hooks/useGetPostOwner";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  const { _id } = useParams(); 
  const { isLoading, getPostById } = useGetAllPosts();

  const post = getPostById(_id);

  if (isLoading) {
    return ;
  }

  if (!post) {
    return (
      <div className='flex flex-col items-center h-5/6 justify-center'>
        <h2 className='font-normal mb-5'> Sorry! This post does not exist.</h2>
        <h2 className='text-blue-mana'>(• ᴖ •｡ )</h2>
        <Link
          to='/'
          className='text-blue-mana'
        >
          Go to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <PostCard post={post}/>
    </div>
  )
}

export default DetailsPage;
