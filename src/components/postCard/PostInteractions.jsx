import { FaRegComment, FaRegHeart } from "react-icons/fa";
import Comment from "./comments/Comment";

const PostInteractions = ({ likes, comments }) => {
    return (
        <section className="post-interactions flex flex-col">
            <div className='likes-comments-container flex flex-row gap-3 my-5'>
                <div className='likes flex flex-row gap-1'>
                    <FaRegHeart className="text-2xl" />
                    <span className="text-flagstone">{likes}</span>
                </div>
                <div className='comments flex flex-row gap-1'>
                    <FaRegComment className="text-2xl " />
                    <span className="text-flagstone">{comments}</span>
                </div>
            </div>
            <div>
                <h3>Comments</h3>
                <div className='comments-container overflow-auto max-h-40 mt-15'>        
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>         
        </section>
    )
}

export default PostInteractions;
