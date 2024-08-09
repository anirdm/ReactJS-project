import React from 'react'
import { useUserProfile } from '../../contexts/UserProfileContext';
import { useUserAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import useEditPost from '../../hooks/useEditPost';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetUserPosts from '../../hooks/useGetUserPosts';
import useGetPostByPostId from '../../hooks/useGetPostByPostId';
import { Link } from 'react-router-dom';

const PostEdit = () => {
    /*const { user } = useUserAuth();
    console.log(user);*/
    //const location = useLocation();
    const { user } = useUserAuth();
    const { _id } = useParams();
    const { post, loading } = useGetPostByPostId(_id);
    const { editPost } = useEditPost();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        if (post) {
            setInputs({
                title: post.title,
                description: post.description,
            });
        }
    }, [post]);

    if (loading) {
        return;
    }

    if (post.createdBy !== user.uid) {
        return (
            <div className='flex flex-col items-center h-5/6 justify-center'>
                <h2 className='font-normal mb-5'>According to my calculations you shouldn't be here!</h2>
                <h2 className='text-blue-mana'>(⌐□_□)</h2>
                <Link
                    to='/'
                    className='text-blue-mana'
                >
                    Go to Home
                </Link>
            </div>
        )
    }

    const handleEditPost = async (e) => {
        e.preventDefault();

        try {
            editPost(_id, inputs);
            navigate(`/post/${_id}`);
        } catch (err) {
            console.log(err);
            /* */
        };
    }


    return (
        <div className='flex justify-center items-center h-5/6 mt-6'>
            <form
                action='post'
                className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg'
                onSubmit={handleEditPost}
            >
                <h2 className='font-medium mb-6'>Edit Post</h2>

                <div className='flex gap-5'>

                    <div>
                        <div className="flex flex-col gap-6">
                            <div className='flex flex-col gap-3'>
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="Add a title"
                                    name="title"
                                    value={inputs.title}
                                    onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                                />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Description</label>
                                <textarea
                                    placeholder="Add a description"
                                    name="description"
                                    className='bg-bright-white rounded-xl h-20 resize-none p-2'
                                    value={inputs.description}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                />
                            </div>

                            <button
                                type='submit'
                                className='primary-button self-end mt-3'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostEdit;
