import React from 'react'
import ProfileHeader from '../../components/profile/ProfileHeader'
import UserPosts from '../../components/profile/UserPosts'
import ProfileTabs from '../../components/profile/ProfileTabs'

const ProfilePage = () => {
    return (
        <>
            <ProfileHeader/>           
            <ProfileTabs/>
            <UserPosts/>       
        </>
    )
}

export default ProfilePage;
