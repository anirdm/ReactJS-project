import { IoSend } from "react-icons/io5";

const handleSubmit = (e) => {
    e.preventDefault();
   
};

const PostFooter = () => {
    return (    
        <footer className="border-t border-flagstone pt-5">
            <form onSubmit={handleSubmit} className="flex gap-3 w-full justify-between">
                <div className="flex gap-3">
                    <img className='w-12 h-12 rounded-full object-cover' src="/profile-pic.jfif" alt="" />
                    <input 
                        type="text" 
                        placeholder="Add a comment"
                        className="shadow-md"
                    />
                </div>
                <button className="primary-button p-5"><IoSend className='text-xl'/></button>
            </form> 
        </footer>  
        
    )
}

export default PostFooter;