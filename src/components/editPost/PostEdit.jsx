import React from 'react'
import { useUserAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import useEditPost from '../../hooks/useEditPost';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPostByPostId from '../../hooks/useGetPostByPostId';
import { Link } from 'react-router-dom';
import { editPostSchema } from '../../schemas/editPostSchema';
import { useFormik } from 'formik';
import ButtonSpinner from '../buttonSpinner/ButtonSpinner';

const PostEdit = () => {
    const { user } = useUserAuth();
    const { _id } = useParams();
    const { post, loading } = useGetPostByPostId(_id);
    const { editPost, isUpdating } = useEditPost();
    const navigate = useNavigate();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!loading && post) {
            setIsReady(true);
        }
    }, [loading, post]);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            title: post?.title || '',
            description: post?.description || '',
        },
        enableReinitialize: true,
        validationSchema: editPostSchema,
        onSubmit: async (values) => {
            try {
                await editPost(_id, values);
                navigate(`/post/${_id}`);
            } catch (err) {
                console.error('Error submitting form:', err);
            }
        }
    });

    if (loading) {
        return ;
    }

    if (!isReady) {
        return ;
    }

    if (post?.createdBy !== user.uid) {
        return (
            <div className='flex flex-col items-center h-5/6 justify-center'>
                <h2 className='font-normal mb-5'>According to my calculations, you shouldn't be here!</h2>
                <h2 className='text-blue-mana'>(⌐□_□)</h2>
                <Link to='/' className='text-blue-mana'>
                    Go to Home
                </Link>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center h-5/6 mt-6'>
            <form
                action='post'
                className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg'
                onSubmit={handleSubmit}
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
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.title && touched.title ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.title}</p>) : null}
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label>Description</label>
                                <textarea
                                    placeholder="Add a description"
                                    name="description"
                                    className='bg-bright-white rounded-xl h-20 resize-none p-2'
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.description && touched.description ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.description}</p>) : null}
                            </div>
                            
                            <button
                                type='submit'
                                className="primary-button self-end mt-3"
                            >
                                {isUpdating && (
                                    <ButtonSpinner />
                                )}
                                {isUpdating ? '' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostEdit;
