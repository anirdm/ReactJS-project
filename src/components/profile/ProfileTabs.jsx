const ProfileTabs = () => {
    return (
        <div className='m-5 p-3 flex justify-around flex-row border border-flagstone text-flagstone shadow-lg'>
            <div className="table-item">
                <button>Posts</button>
            </div>
            <div className="table-item">
                <button>Liked</button>
            </div>
        </div>
    )
}

export default ProfileTabs;
