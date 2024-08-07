import React, { useRef } from 'react'
import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername';

const EditProfile = () => {
    const location = useLocation();

    const { userProfile } = location.state || {};
    /*const { userProfile }= useUserProfile();*/
    /*const { userProfile } = useGetUserProfileByUsername(username);*/

    const { handleImageChange, selectedFile, setSelectedFile, error } = usePreviewImg();
    const { editProfile } = useEditProfile();

    const [inputs, setInputs] = useState({
        bio: '',
        name: '',
        username: ''
    });

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    //  function that triggers the click event on the hidden file input element
    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();

        try {
            editProfile(inputs, selectedFile);
            setSelectedFile(null);
            navigate(`/${userProfile.username}`);
        } catch (err) {
            console.log(err);
            /* */
        };
    }

    const handleCancelClick = () => {
        navigate(`/${userProfile.username}`)
    };

    return (
        <div className='flex justify-center items-center mt-6'>
            <form
                action='post'
                className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center'
                onSubmit={handleEditProfile}
            >
                <h2 className='font-semibold mb-6'>Edit profile</h2>
                <div className="flex flex-col gap-6">
                    <div className='flex flex-col gap-3'>
                        <label>Photo</label>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef} // to get a reference to the hidden file input element.
                            hidden
                            onChange={handleImageChange}
                        />
                        {/* Custom button */}
                        <div className='flex items-center gap-5'>
                            <img
                                src={selectedFile || userProfile.profilePicURL}
                                alt="profile-pic"
                                className='rounded-full w-14 h-14 object-cover'
                            />
                            <button
                            type='button'
                                className='primary-button w-fit h-fit'
                                onClick={handleFileInputClick}
                            >
                                Change
                            </button>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Bio</label>
                            <textarea
                                name="bio"
                                /*id=""*/
                                placeholder='Add a bio'
                                className='bg-bright-white rounded-xl h-20 resize-none p-2'
                                value={inputs.bio || userProfile.bio}
                                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                            >
                            </textarea>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder=""
                                name="name"
                                value={inputs.name || userProfile.name}
                                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            />
                        </div>

                        {/*<div className='flex flex-col gap-3'>
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder=""
                                name="username"
                                value={inputs.username || userProfile.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            />
                        </div>*/}
                    </div>

                    {error && <p className='text-red-500'>{error}</p>}

                    <div className='flex justify-end gap-2'>
                        <button
                            className='secondary-button'
                            type='button'
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                        <button
                            className='primary-button'
                            type='submit'
                        >
                            Save
                        </button>

                    </div>

                </div>
            </form>
        </div>
    )
}

export default EditProfile;
