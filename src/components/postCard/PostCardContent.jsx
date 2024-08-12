import { useUserAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage, db } from "../../firebase/firebaseConfig";
import { arrayRemove, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { usePosts } from "../../contexts/PostContext";
import { useEffect } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import useGetPostOwner from "../../hooks/useGetPostOwner";
import useLikePost from "../../hooks/useLikePost";

const PostCardContent = ({ post }) => {

    // Call custom hook at the top level
    /*const { owner } = useGetPostOwner(post.createdBy); */

    const { user } = useUserAuth();
    const { deletePost } = usePosts();
    const navigate = useNavigate();

    const [isDeleting, setIsDeleting] = useState(false);

    const { owner, loading } = useGetPostOwner(post.createdBy);
    const { handleLikePost, isLiked, likes, error } = useLikePost(post);

    if (loading) {
        return;
    }

    const handleDeletePost = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        // if while deleting the user clicks again
        if (isDeleting) return;

        try {
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef);
            const userRef = doc(db, 'users', user.uid);
            await deleteDoc(doc(db, 'posts', post.id));

            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            });

            deletePost(post.id);
            navigate(`/${owner.username}`)
        } catch (error) {
            /* */
            setIsDeleting(false);
        }
    }

    return (
        <section>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-medium">{post.title}</h1>
                        {post.description !== '' ? (
                            <h3>{post.description}</h3>
                        ) : null}
                    </div>

                    {user && (
                        user.uid === owner.uid ? (
                            <div className="flex gap-5 mr-2.5">
                                <button
                                    onClick={() => navigate(`/post/${post.id}/edit`)}
                                >
                                    <FiEdit size={25} />
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                >
                                    <FaTrashCan size={25} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleLikePost}
                                className=" mr-5"
                            >
                                {!isLiked ? <GoHeart className="w-8 h-10" /> : <GoHeartFill className="w-8 h-10 text-red-500" />}
                            </button>         
                        )              
                    )}

                </div>
                

                {/*<div className='tags-container my-5 text-flagstone'>
                    {/*{tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}
                </div>*/}
            </div>

            <div>
                <button
                    className="flex items-center mb-2.5 mt-5 gap-2.5"
                    onClick={() => navigate(`/${owner.username}`)}
                >
                    <img className='w-12 h-12 rounded-full object-cover' src={owner.profilePicURL} alt="profile-pic" />
                    <div className="">
                        <span>By {owner.name}</span>
                    </div>
                </button>
            </div>
        </section>
    )
}

export default PostCardContent;
