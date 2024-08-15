import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useUserProfile } from '../contexts/UserProfileContext';
import { db } from '../firebase/firebaseConfig';

const useGetUserProfileByUsername = (username) => {
    const { userProfile, setUserProfile } = useUserProfile();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUserProfile = async () => {
          setIsLoading(true);

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
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
        };
    
        getUserProfile();
      }, [username, setUserProfile]);

      return { userProfile, isLoading };
}

export default useGetUserProfileByUsername;
