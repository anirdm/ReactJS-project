import { useState } from "react";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import FeedItem from "../../components/feedItem/FeedItem";
import { fetchPosts } from "../../services/fetchPosts";
import { usePosts } from "../../contexts/PostContext";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import useGetAllPosts from "../../hooks/useGetAllPosts";

const ExplorePage = () => {
  const { isLoading, posts } = useGetAllPosts();

  return (
    <div className="feed">
      {posts.length > 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}
        >
          <Masonry style={{ gap: '15px' }}>
            {posts.map(post => <FeedItem key={post.id} post={post} _id={post.id} />)}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <div className='flex flex-col items-center w-full h-screen justify-center'>
          <h2 className='font-normal mb-5'> There are no posts created yet.</h2>
        </div>
      )}

    </div>
  )
}

export default ExplorePage;
