import React, { useRef } from 'react';
import { useState } from 'react';
import { LuUpload } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import usePreviewImg from '../../hooks/usePreviewImg';
import { useUserAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../contexts/PostContext';
import { useLocation } from 'react-router-dom';
import { addDoc, collection, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
    });

    const [err, setErr] = useState('');

	const imageRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile, error } = usePreviewImg();
	const { isLoading, handleCreatePost } = useCreatePost();

    const navigate = useNavigate();


    //  function that triggers the click event on the hidden file input element
    const handleChooseImageClick = () => {
        imageRef.current.click();
    };

    const handlePostCreation = async (e) => {
        e.preventDefault();

        try {
            await handleCreatePost(selectedFile, inputs);
            setInputs({ title: '', description: '' });
            setSelectedFile(null); // Reset selected file

            // navigate(`/post/${postDocRef.id}`); // Navigate to the new post details page
        } catch (err) {
            setErr(err);
            /* */
        }
    }

    return (
        <div className='flex justify-center items-center mt-6'>
            <form
                action='post'
                className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg'
                onSubmit={handlePostCreation}
            >
                <h2 className='font-medium mb-6'>Create Post</h2>

                <div className='flex gap-5'>

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
                                <div className='flex flex-col justify-center items-center h-96 w-96 rounded-xl bg-bright-white'>
                                    <LuUpload size={45} />
                                    <button
                                        type='button'
                                        className='primary-button mt-5'
                                        onClick={handleChooseImageClick}
                                    >
                                        Choose an image
                                    </button>
                                    <span className='font-small text-flagstone text-center mt-5'>We recommend using .jpg or .png files less than 20MB</span>
                                </div>
                            )}
                        {/**/}
                    </div>

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
                                    required
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

                            {/* Hidden file input */}
                            <input
                                type="file"
                                name=""
                                id=""
                                hidden
                                ref={imageRef}
                                onChange={handleImageChange}
                            />

                            {error && <p className='text-red-500'>{error}</p>}
                            {err && <p className='text-red-500'>{err.message}</p>}

                            <button
                                type='submit'
                                className='primary-button self-end mt-24'>
                                Post
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
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile, error } = usePreviewImg();
    const { user } = useUserAuth();
    const { createPost } = usePosts();
    const { pathname } = useLocation();

    const [isLoading, setIsLoading] = useState(false);

    const handleCreatePost = async (selectedFile, inputs) => {
        if (isLoading) return;

        if (!selectedFile) {
            throw new Error('Please select a file');
        }

        setIsLoading(true);

        const newPost = {
            title: inputs.title.trim(),
            description: inputs.description.trim(),
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

            const fileBlob = await fetch(selectedFile).then(res => res.blob());
            await uploadBytes(imageRef, fileBlob);
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(postDocRef, { imageURL: downloadURL });

            newPost.imageURL = downloadURL;

            createPost({ ...newPost, id: postDocRef.id });

            console.log(newPost);

            /*navigate to the new post details page */
        } catch (err) {
            /* */
            /*setErr(err);*/
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, handleCreatePost };
}
