import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../services/fetchPosts";
import PostCard from "../../components/postCard/PostCard";

const DetailsPage = () => {
  const { _id } = useParams(); 
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await fetchPostById(_id);
        setPost(postData);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch post details.');
        console.error(error);
        setIsLoading(false); 
      }
    };

    getPost();
  }, [_id]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex justify-center">
      <PostCard {...post} />
    </div>
  )
}

export default DetailsPage;
