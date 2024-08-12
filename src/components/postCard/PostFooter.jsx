import { IoSend } from "react-icons/io5";
import usePostComment from "../../hooks/usePostComment";
import { useUserAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

const PostFooter = () => {
    const { isCommenting, handlePostComment } = usePostComment();
    const { user } = useUserAuth();
    const { _id: postId } = useParams(); 

    const [comment, setComment] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if(comment === '') {
            return;
        };

        await handlePostComment(postId, comment);
        setComment('');
    };

    return (    
        <footer className="border-t border-flagstone pt-5">
            <form 
                onSubmit={handleCommentSubmit} 
                className="flex gap-3 w-full gap-3"
            >
                <div className="flex gap-3">
                    <img className='w-12 h-12 rounded-full object-cover' src={user.profilePicURL} alt="profile-pic" />
                    <input 
                        type="text" 
                        placeholder="Add a comment"
                        className="shadow-md"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button 
                    className="primary-button p-5"
                    type="submit"
                >
                    {isCommenting ? (
                        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    ) : (
                        <IoSend size={20}/>
                    )}
                </button>
            </form> 
        </footer>         
    )
}

export default PostFooter;