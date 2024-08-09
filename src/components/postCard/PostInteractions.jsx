import { FaRegComment, FaRegHeart } from "react-icons/fa";
import Comment from "./comments/Comment";

const PostInteractions = ({ post }) => {
    return (
        <section className="post-interactions flex flex-col">
            <div className='likes-comments-container flex flex-row gap-3 my-5'>
                <div className='likes flex flex-row gap-1'>
                    <FaRegHeart className="text-2xl" />
                    <span className="text-flagstone">likes</span>
                </div>
                <div className='comments flex flex-row gap-1'>
                    <FaRegComment className="text-2xl " />
                    <span className="text-flagstone">{post.comments.length} comments</span>
                </div>
            </div>
            <div>
                <h3>Comments</h3>
                <div className='comments-container overflow-auto max-h-40 mt-15'>
                    {post.comments.length !== 0 ? (
                        post.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <p className="my-5 ml-5 text-flagstone">No comments yet! You can add the first one (˶ᵔ ᵕ ᵔ˶)</p>
                    )}

                </div>
            </div>
        </section>
    )
}

export default PostInteractions;
