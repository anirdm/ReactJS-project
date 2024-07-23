import PostContent from "./PostCardContent";
import PostInteractions from "./PostInteractions";
import PostFooter from "./PostFooter";

const PostCard = ({ title, description, tags, comments, likes, owner, ownerImg, image }) => {
    return (
        <div className="post-card flex flex-col lg:flex-row w-3/4 lg:w-5/6 my-2 border border-gray-300 rounded-xl gap-12 p-2 shadow-md h-fit overflow-auto">
            <div className="post-image-container flex-1">
                <img className='rounded-xl w-full' src={image} alt="post-img" />
            </div>
            <div className="post-info flex flex-col flex-1 h-full">
                <PostContent
                    title={title}
                    description={description}
                    tags={tags}
                    owner={owner}
                    ownerImg={ownerImg}
                />
                <PostInteractions
                    likes={likes}
                    comments={comments}
                />
                {/*<PostFooter />*/}
            </div>
        </div>
    )
}

export default PostCard;
