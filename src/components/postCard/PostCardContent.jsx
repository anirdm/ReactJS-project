const PostCardContent = ({ title, description, tags, owner, ownerImg }) => {
    return (
        <section>
            <div>
                <h1>{title}</h1>
                <h3>{description}</h3>
                <div className='tags-container my-5 text-flagstone'>
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                    ))}
                </div>
            </div>

            <div className='profile-info flex items-center mb-2.5 gap-2.5'>
                <img className='w-12 h-12 rounded-full object-cover' src={ownerImg} alt="profile-pic" />
                <div className="">
                    <span>By {owner}</span>
                </div>
            </div>
        </section>
    )
}

export default PostCardContent;
