const ProfileHeader = () => {
    return (
        <header className="profile-header flex md:flex-row min-[320px]:flex-col items-center justify-between ">
            <div className='flex md:flex-row min-[320px]:flex-col gap-5 items-center flex-wrap'>
                <img src="/default-avatar-v7.png" className="w-40 h-40 object-cover rounded-3xl" alt="profile-pic" />
                <div>
                    <h2 className='m-0'>Name</h2>
                    <h3 className='text-lg text-flagstone'>@username</h3>
                    <p className='text-sm break-words mt-5'>
                        🎧﹐ıllı﹒ ♡  <br />
                        ＞＜﹐🔗 infp @ :: <br />
                        ✦. ⊹ ˚ . music : 🎱 <br />
                    </p>
                </div>
            </div>
            <div className='flex md:flex-col min-[320px]:flex-col-reverse md:items-end min-[320px]:items-center'>
                {/*<button className={` ${isFollowing ? styles.buttonUnfollow : ''}`}
                            onClick={toggleFollow}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>*/}
                <div className="flex text-center mt-5 gap-3 text-flagstone">
                    <div className="column">
                        <p>0 posts</p>
                    </div>
                    <div className="column">
                        <p>281 followers</p>
                    </div>
                    <div className="column">
                        <p>750 following</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ProfileHeader;
