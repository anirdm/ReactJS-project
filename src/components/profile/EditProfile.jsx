import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import { useUserAuth } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import { editProfileSchema } from '../../schemas/editProfileSchema';
import ButtonSpinner from '../buttonSpinner/ButtonSpinner';

const EditProfile = () => {
    const { user } = useUserAuth();
    const { username } = useParams();
    const { handleImageChange, selectedFile, error } = usePreviewImg();
    const { editProfile, isUpdating } = useEditProfile();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    if (username !== user.username) {
        return (
            <div className='flex flex-col items-center h-5/6 justify-center'>
                <h2 className='font-normal mb-5'> HA! You thought!</h2>
                <h2 className='text-blue-mana'>¬‿¬</h2>
            </div>
        )
    }

    const onSubmit = async (values) => {
        try {
            await editProfile(values);
            navigate(`/${user.username}`);
        } catch (err) {
            /** */
        }
    }

    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } = useFormik({
        initialValues: {
            selectedFile: user.profilePicURL,
            bio: user?.bio,
            name: user.name
        },
        validationSchema: editProfileSchema,
        onSubmit
    });

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleProfilePicChange = (e) => {
        const file = e.currentTarget.files[0];

        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFieldValue('selectedFile', fileURL);
        }

        handleImageChange(e);
    }

    const handleCancelClick = () => {
        navigate(`/${user.username}`)
    };

    return (
        <div className='flex justify-center items-center h-4/5 mt-6'>
            <form
                action='post'
                className='flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center'
                onSubmit={handleSubmit}
            >
                <h2 className='font-semibold mb-6'>Edit profile</h2>
                <div className="flex flex-col gap-6">
                    <div className='flex flex-col gap-3'>
                        <label>Photo</label>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            hidden
                            onChange={handleProfilePicChange}
                        />
                        {/* Custom button */}
                        <div className='flex items-center gap-5'>
                            <img
                                src={selectedFile || user.profilePicURL}
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
                                placeholder='Add a bio'
                                className='bg-bright-white rounded-xl h-20 resize-none p-2'
                                value={values?.bio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                            </textarea>
                            {errors.bio && touched.bio ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.bio}</p>) : null}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Add a name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.name}</p>) : null}
                        </div>
                    </div>

                    {error && <p className='text-red-500'>{error}</p>}

                    <div className='flex justify-end gap-2'>
                        <button
                            className="secondary-button"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="primary-button"
                        >
                            {isUpdating && (
                                <ButtonSpinner />
                            )}
                            {isUpdating ? '' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;
