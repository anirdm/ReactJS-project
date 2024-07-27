import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

// Create the AuthContext
// createContext(
//userId: ''
//email: ''
//...
//)
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useUserAuth = () => {
    return useContext(AuthContext);
}

// AuthProvider component to wrap the application and provide context values
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    // Set up authentication state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (inputs) => {
        const trimmedInputs = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, value.trim()])
        );

        if (trimmedInputs.password !== trimmedInputs.rePassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(auth, trimmedInputs.email, trimmedInputs.password);

            const user = {
                uid: newUser.user.uid,
                email: trimmedInputs.email,
                username: trimmedInputs.username,
                name: trimmedInputs.name,
                profilePicURL: '',
                bio: '',
                followers: [],
                following: [],
                posts: [],
                likedPosts: [],
            }

            await setDoc(doc(db, "users", newUser.user.uid), user);
            localStorage.setItem('user-info', JSON.stringify(user));
            setUser(user);
            setError(''); // Clear error on success
        } catch (err) {
            throw new Error(err);
        }
    }

    const logOut = async () => {
        await signOut(auth);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logOut, error }}>
            {children}
        </AuthContext.Provider>
    );
}

