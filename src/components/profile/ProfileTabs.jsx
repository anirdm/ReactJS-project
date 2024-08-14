import { useUserAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../contexts/UserProfileContext";

const ProfileTabs = ({ selectedButton, onSelectButton }) => {
    const { user } = useUserAuth();
    const { userProfile } = useUserProfile();

    const profileOwner = user && user.username === userProfile.username;

    return (
        <div className='m-5 p-3 flex justify-around flex-row border border-flagstone text-flagstone shadow-lg'>
            <div className="table-item">
                <button 
                    className={`${selectedButton === 'posts' ? 'underline' : ''}`}
                    onClick={() => onSelectButton('posts')}
                > Posts
                </button>
            </div>
            {profileOwner && (
                <div className="table-item">
                    <button 
                        className={`${selectedButton === 'liked' ? 'underline' : ''}`}
                        onClick={() => onSelectButton('liked')}
                    > Liked
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileTabs;
