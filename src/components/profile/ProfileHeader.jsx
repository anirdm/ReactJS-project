import { useUserProfile } from "../../contexts/UserProfileContext";
import { FiEdit } from "react-icons/fi";
import { useUserAuth } from "../../contexts/AuthContext";

const ProfileHeader = () => {
    const { userProfile } = useUserProfile();
    const { user } = useUserAuth();
    // user == authUser
    const profileOwner = user && user.username === userProfile.username;
    const nonProfileOwnerAuthUser =user && user.username !== userProfile.username;

    return (
        <header className="profile-header flex md:flex-row min-[320px]:flex-col items-center justify-between ">
            <div className='flex md:flex-row min-[320px]:flex-col gap-5 items-center flex-wrap'>
                <img src={userProfile.profilePicURL} className="w-40 h-40 object-cover rounded-3xl" alt="profile-pic" />
                <div>
                    <h2 className='m-0'>{userProfile.name}</h2>
                    <h3 className='text-lg text-flagstone'>@{userProfile.username}</h3>
                    <p className='text-sm break-words mt-5'>{userProfile.bio}</p>
                </div>
            </div>
            <div className='flex md:flex-col min-[320px]:flex-col-reverse md:items-end min-[320px]:items-center'>
                { profileOwner && (
                    <button>
                        <FiEdit size={30} />
                    </button>               
                )}

                { nonProfileOwnerAuthUser && (
                    <button className="primary-button">
                        Follow
                    </button>
                )}
               
            {/*<button className={` ${isFollowing ? styles.buttonUnfollow : ''}`}
                            onClick={toggleFollow}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>*/}
            <div className="flex text-center mt-5 gap-3 text-flagstone">
                <div className="column">
                    <p>{userProfile.posts.length} posts</p>
                </div>
                <div className="column">
                    <p>{userProfile.followers.length} followers</p>
                </div>
                <div className="column">
                    <p>{userProfile.following.length} following</p>
                </div>
            </div>
        </div>
        </header >
    )
}

export default ProfileHeader;
