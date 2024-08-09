import PostCardContent from "./PostCardContent";
import PostInteractions from "./PostInteractions";
import PostFooter from "./PostFooter";
import { useUserAuth } from "../../contexts/AuthContext";

const PostCard = ({ post }) => {
    const { user } = useUserAuth();

    return (
        <div className="post-card flex flex-col lg:flex-row w-3/4 lg:w-5/6 my-2 border border-gray-300 rounded-xl gap-12 p-2 shadow-md h-fit overflow-auto">
            <div className="post-image-container flex-1">
                <img className='rounded-xl w-full' src={post.imageURL} alt="post-img" />
            </div>
            <div className="post-info flex flex-col flex-1 h-full justify-between">
                <PostCardContent
                    post = {post}
                />
                <PostInteractions
                    post = {post}

                />
                { user && <PostFooter />}    
            </div>
        </div>
    )
}

export default PostCard;
