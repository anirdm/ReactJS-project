import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useUserAuth = () => {
    return useContext(AuthContext);
}

// AuthProvider component to wrap the application and provide context values
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signUp = async (inputs) => {
        const trimmedInputs = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, value.trim()])
        );

        if (trimmedInputs.password !== trimmedInputs.rePassword) {
            throw new Error('Passwords do not match');
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
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                throw new Error('This email address is already associated with an account. Please try logging in or use a different email address.');
            } else if (err.code === 'auth/weak-password') {
                throw new Error('Password should be at least 6 characters.');
            } else {
                throw new Error(err.message);
            }      
        }
    }

    const login = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

            if (userDoc.exists()) {
                const user = userDoc.data();
                localStorage.setItem('user-info', JSON.stringify(user));
                setUser(user);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const logOut = async () => {
        // if user
        try {
            await signOut(auth);
            localStorage.removeItem('user-info');
            setUser(null);
        } catch(err) {
            setError(err);
            throw new Error(err.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signUp, login, logOut, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

