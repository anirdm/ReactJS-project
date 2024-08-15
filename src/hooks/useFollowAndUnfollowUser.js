import { useEffect, useState } from 'react'
import { useUserAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const useFollowAndUnfollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { user, setUser } = useUserAuth();
    const { userProfile, setUserProfile } = useUserProfile();

    const handleFollowOrUnfollowUser = async () => {
        try {
            setIsUpdating(true);

            const currentUserRef = doc(db, "users", user.uid);
            const userToFollowOrUnfollowRef = doc(db, "users", userId);

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            });

            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            });

            if(isFollowing) {
                setUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                });

                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== user.uid)
                });

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: user.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false);
            } else { 
				setUser({
					...user,
					following: [...user.following, userId],
				});

				setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid],
                });
					
				localStorage.setItem( "user-info", JSON.stringify({
						...user,
						following: [...user.following, userId],
					})
				);
				setIsFollowing(true);
            }
        } catch (error) {
            /* */
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if (user) {
            const isFollowing = user.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [user, userId]);

    return { isUpdating, isFollowing, handleFollowOrUnfollowUser };

}

export default useFollowAndUnfollowUser;
