import { useUserProfile } from "../../contexts/UserProfileContext";

const PostCardContent = ({ post }) => {
    const { userProfile } = useUserProfile() ;
    console.log(userProfile);

    return (
        <section>
            <div>
                <h1>{post.title}</h1>
                <h3>{post.description}</h3>
                <div className='tags-container my-5 text-flagstone'>
                    {/*{tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}*/}
                </div>
            </div>

            <div className='profile-info flex items-center mb-2.5 gap-2.5'>
                <img className='w-12 h-12 rounded-full object-cover' src={userProfile.profilePicURL} alt="profile-pic" />
                <div className="">
                    <span>By {userProfile.name}</span>
                </div>
            </div>
        </section>
    )
}

export default PostCardContent;
