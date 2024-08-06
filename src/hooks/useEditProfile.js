import { useState } from 'react'
import { useUserAuth } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { storage, db } from '../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore'; // or firestore
import { useUserProfile } from '../contexts/UserProfileContext';

const useEditProfile = () => {
    const [ error, setError ] = useState('');

    const { user, setUser } = useUserAuth();
    const { setUserProfile } = useUserProfile();

    const editProfile = async (inputs, selectedFile) => {
        if (!user) return;
        /*setIsUpdating(true);*/

        const storageRef = ref(storage, `profilePics/${user.uid}`);
        const userDocRef = doc(db, "users", user.uid);

        let URL = '';
        try {
            if (selectedFile) {
                // Use uploadBytes to upload the file
                const fileBlob = await fetch(selectedFile).then(res => res.blob());
                await uploadBytes(storageRef, fileBlob);
                /*await uploadString(storageRef, selectedFile, "data_url");*/
                // gets the URL of the image
                URL = await getDownloadURL(ref(storage, `profilePics/${user.uid}`));
            }

            const updatedUser = {
                ...user, // to not override the other data (following, followers etc.)
                bio: inputs.bio || user.bio,
                name: inputs.name || user.name,
                /*username: inputs.username || user.username,*/
                profilePicURL: URL || user.profilePicURL
            }

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem('user-info', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setUserProfile(updatedUser);
        } catch (error) {
            setError(error);
            return;
        }
    } 

    return { editProfile };
}

export default useEditProfile;
