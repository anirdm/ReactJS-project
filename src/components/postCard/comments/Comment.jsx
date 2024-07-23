const Comment = () => {
  return (
    <div className="comment flex gap-3 items-center my-5 mr-2.5">
      <div className="image">
            <img className='w-10 h-10 rounded-full object-cover'src="/profile-pic.jfif" alt="" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Name</p>
        <p>Love this!💚</p>
      </div>
      <div>
        {/* date */}
      </div>
    </div>
  )
}

export default Comment;
