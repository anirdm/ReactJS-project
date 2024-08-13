import { useState } from 'react'
import { useUserAuth } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { storage, db } from '../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore'; // or firestore
import { useUserProfile } from '../contexts/UserProfileContext';

const useEditProfile = () => {
    const [ error, setError ] = useState('');
    const [ isUpdating , setIsUpdating ] = useState(false);
    const { user, setUser } = useUserAuth();
    const { setUserProfile } = useUserProfile();

    const editProfile = async (inputs) => {
        if (!user) return;

        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${user.uid}`);
        const userDocRef = doc(db, "users", user.uid);

        let URL = '';
        try {
            if (inputs.selectedFile && !inputs.selectedFile.startsWith('http')) {
                // Use uploadBytes to upload the file
                const fileBlob = await fetch(inputs.selectedFile).then(res => res.blob());
                await uploadBytes(storageRef, fileBlob);
                // gets the URL of the image
                URL = await getDownloadURL(ref(storage, `profilePics/${user.uid}`));
            }

            const updatedUser = {
                ...user, // to not override the other data (following, followers etc.)
                bio: inputs.bio,
                name: inputs.name,
                profilePicURL: URL || user.profilePicURL
            }

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem('user-info', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setUserProfile(updatedUser);
        } catch (error) {
            setError(error);
            return;
        } finally {
            setIsUpdating(false);
        }
    } 

    return { editProfile, isUpdating };
}

export default useEditProfile;
