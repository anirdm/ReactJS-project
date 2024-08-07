import PostCardContent from "./PostCardContent";
import PostInteractions from "./PostInteractions";
import PostFooter from "./PostFooter";

const PostCard = ({ post }) => {
    return (
        <div className="post-card flex flex-col mt-16 lg:flex-row w-3/4 lg:w-5/6 my-2 border border-gray-300 rounded-xl gap-12 p-2 shadow-md h-fit overflow-auto">
            <div className="post-image-container flex-1">
                <img className='rounded-xl w-full' src={post.imageURL} alt="post-img" />
            </div>
            <div className="post-info flex flex-col flex-1 h-full">
                <PostCardContent
                    post = {post}
                />
                <PostInteractions
                    post = {post}

                />
                {/*<PostFooter />*/}
            </div>
        </div>
    )
}

export default PostCard;
