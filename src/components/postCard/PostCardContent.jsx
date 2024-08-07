import { useUserAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage, db } from "../../firebase/firebaseConfig";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { usePosts } from "../../contexts/PostContext";

const PostCardContent = ({ post }) => {
    const { userProfile } = useUserProfile();
    const { user } = useUserAuth();
    const { deletePost } = usePosts();

    const [ isDeleting, setIsDeleting ] = useState(false);

    const navigate = useNavigate();

    const handleDeletePost = async () => {
        if(!window.confirm('Are you sure you want to delete this post?')) return;
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
            navigate(`/${userProfile.username}`)
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
                        <h1>{post.title}</h1>
                        {post.description !== '' ? (
                            <h3>{post.description}</h3>
                        ) : null}
                    </div>

                    {user.uid && (
                        <div className="flex gap-5 mr-2.5">
                            <button               
                            >
                                <FiEdit size={30} />
                            </button>
                            <button
                                onClick={handleDeletePost}
                            >
                                <FaTrashCan size={30} />
                            </button>
                        </div>
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
                    onClick={() => navigate(`/${userProfile.username}`)}
                >
                    <img className='w-12 h-12 rounded-full object-cover' src={'/pfp-2.jfif'} alt="profile-pic" />
                    <div className="">
                        <span>By {userProfile.name}</span>
                    </div>
                </button>
            </div>
        </section>
    )
}

export default PostCardContent;
