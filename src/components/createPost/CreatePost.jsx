import React, { useRef } from 'react';
import { useState } from 'react';
import { LuUpload } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import usePreviewImg from '../../hooks/usePreviewImg';
import { useUserAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../contexts/PostContext';
import { addDoc, collection, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { createPostSchema } from '../../schemas/createPostSchema';
import { useFormik } from 'formik';
import ButtonSpinner from '../buttonSpinner/ButtonSpinner';

const CreatePost = () => {
    const { handleImageChange, selectedFile, error } = usePreviewImg();
    const imageRef = useRef(null);
    const { isLoading, handleCreatePost } = useCreatePost();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await handleCreatePost(values, navigate);
        } catch (err) {
            /** */
        }
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            description: '',
            selectedFile: null
        },
        validationSchema: createPostSchema,
        onSubmit
    });

    const handleChooseImageClick = () => {
        imageRef.current.click();
    };

    const handlePostImageChange = (e) => {
        const file = e.currentTarget.files[0];

        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFieldValue('selectedFile', fileURL);
        }

        handleImageChange(e);
    }

    return (
        <div className='flex justify-center items-center lg:h-4/5 mt-6'>
            <form
                action='post'
                className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg lg:mb-0 mb-14'
                onSubmit={handleSubmit}
            >
                <h2 className='font-medium mb-6'>Create Post</h2>

                <div className='flex flex-col lg:flex-row gap-5'>

                    <div>
                        {selectedFile ? (
                            <div>
                                <img src={selectedFile} className='h-96 w-96 rounded-xl object-cover' alt="" />
                                <button
                                    type='button'
                                    onClick={handleChooseImageClick}
                                    className='mt-3'

                                >
                                    <FiEdit size={25} />
                                </button>
                            </div>
                        )
                            : (
                                <div className='flex flex-col justify-center items-center h-96 lg:w-96 w-fit rounded-xl bg-bright-white'>
                                    <LuUpload size={45} />
                                    <button
                                        type='button'
                                        className='primary-button mt-5'
                                        onClick={handleChooseImageClick}
                                    >
                                        Choose an image
                                    </button>
                                    <span className='font-small text-flagstone text-center mt-5'>We recommend using .jpg or .png files less than 10MB</span>
                                </div>
                            )}

                    </div>

                    <div>
                        <div className="flex flex-col gap-6">
                            <div className='flex flex-col gap-3'>
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="Add a title"
                                    name="title"
                                    className='lg:w-80 w-full'
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

                            <input
                                type="file"
                                name=""
                                id=""
                                hidden
                                ref={imageRef}
                                onChange={handlePostImageChange}
                                onBlur={handleBlur}
                            />

                            {errors.selectedFile && touched.selectedFile ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.selectedFile}</p>) : null}
                            {error && <p className='text-red-500'>{error}</p>}

                            <button
                                type='submit'
                                className="primary-button self-end lg:mt-24"
                            >
                                {isLoading && (
                                    <ButtonSpinner />
                                )}
                                {isLoading ? '' : 'Post'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;

const useCreatePost = () => {
    const { user } = useUserAuth();
    const { createPost } = usePosts();

    const [isLoading, setIsLoading] = useState(false);

    const handleCreatePost = async (values, navigate) => {
        if (isLoading) return;

        setIsLoading(true);

        const newPost = {
            title: values.title.trim(),
            description: values.description.trim(),
            likes: [],
            comments: [],
            createdBy: user.uid,
            createdAt: Date.now()
        }

        try {
            const postDocRef = await addDoc(collection(db, 'posts'), newPost);
            const userDocRef = doc(db, 'users', user.uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

            const fileBlob = await fetch(values.selectedFile).then(res => res.blob());
            await uploadBytes(imageRef, fileBlob);
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(postDocRef, { imageURL: downloadURL });

            newPost.imageURL = downloadURL;

            createPost({ ...newPost, id: postDocRef.id });

            navigate(`/post/${postDocRef.id}`);
        } catch (err) {

        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, handleCreatePost };
}
