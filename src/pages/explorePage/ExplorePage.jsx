import { useState } from "react";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import FeedItem from "../../components/feedItem/FeedItem";
import fetchPosts from "../../services/fetchPosts";

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.log(error);
        console.log('Nice');
      } 
    };

    getPosts();
  }, []);

  return (
    <div className="feed">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}
      >
        <Masonry style={{gap: '15px'}}>
          {posts.map((post) => (
            <FeedItem key={post._id} {...post} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default ExplorePage;
