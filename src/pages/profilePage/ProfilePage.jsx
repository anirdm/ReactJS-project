import React from 'react'
import ProfileHeader from '../../components/profile/ProfileHeader'
import UserPosts from '../../components/profile/UserPosts'
import ProfileTabs from '../../components/profile/ProfileTabs'
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername'
import { useUserProfile } from '../../contexts/UserProfileContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { useUserAuth } from '../../contexts/AuthContext'

const ProfilePage = () => {
    const { username } = useParams();
    const { userProfile, isLoading } = useGetUserProfileByUsername(username);

    if(isLoading) return <Spinner />;  
    if (!userProfile) return <UserNotFound />;

    return (
        <>
            <ProfileHeader />
            <UserPosts />
        </>
    )
}

export default ProfilePage;

const UserNotFound = () => {
    return (
        <div className='flex flex-col items-center h-5/6 justify-center'>
            <h1 className='font-medium mb-5'>User not Found</h1>
            <Link 
                to='/'
                className='text-blue-mana'
            >
                Go to Home
            </Link>
        </div>
    )
}
