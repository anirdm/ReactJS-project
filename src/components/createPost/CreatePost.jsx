import React from 'react';
import { useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";

const CreatePost = () => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    });

    return (
        <div className='flex justify-center items-center mt-6'>
            <form className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center'>
                <h2 className='font-medium mb-6'>Create Post</h2>                  
                    <div className="flex flex-col gap-6">
                        <div className='flex flex-col gap-3'>
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder="Add a title"
                                name="title"
                                value={inputs.title}
                                onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Add a description"
                                name="title"
                                value={inputs.description}
                                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                required
                            />
                        </div>

                        <input type="file" name="" id="" />

                        <button 
                            type='submit'
                            className='primary-button self-end mt-24'>
                            Post
                        </button>
                </div>

            </form>
        </div>
    )
}

export default CreatePost;
