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
    const { userProfile } = useGetUserProfileByUsername(username);
    const { loading } = useUserAuth();

    if(loading) {
        return <Spinner />;
    }

    if (!userProfile) {
        return <UserNotFound />;
    }

    return (
        <>
            <ProfileHeader />
            <ProfileTabs />
            <UserPosts />
        </>
    )
}

export default ProfilePage;

const UserNotFound = () => {
    return (
        <>
            <h1>User not Found</h1>
            <Link to='/'>
                Home
            </Link>
        </>
    )
}
