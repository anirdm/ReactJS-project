import { useState } from "react";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import FeedItem from "../../components/feedItem/FeedItem";
import { fetchPosts } from "../../services/fetchPosts";
import { usePosts } from "../../contexts/PostContext";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import useGetAllPosts from "../../hooks/useGetAllPosts";

const ExplorePage = () => {
  const { isLoading, allPosts }= useGetAllPosts();

  return (
    <div className="feed">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}
      >
        <Masonry style={{ gap: '15px' }}>
          {allPosts.map(post => <FeedItem key={post.id} post={post} _id={post.id} />)}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default ExplorePage;
