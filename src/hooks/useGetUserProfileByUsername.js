import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useUserProfile } from '../contexts/UserProfileContext';
import { db } from '../firebase/firebaseConfig';

const useGetUserProfileByUsername = (username) => {
    const { userProfile, setUserProfile } = useUserProfile();

    useEffect(() => {
        const getUserProfile = async () => {
          try {
            const q = query(collection(db, 'users'), where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return setUserProfile(null);
            }

            let userDoc;
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();
            })
            setUserProfile(userDoc);
            /*setUserProfile(userDoc) */
          } catch (err) {
            console.log(err);
          }
        };
    
        getUserProfile();
      }, [username, setUserProfile]);

      return { userProfile };
}

export default useGetUserProfileByUsername;
