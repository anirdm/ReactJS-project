import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, getDoc, getDocs, doc, collection, query, where } from 'firebase/firestore';
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

    // Set up authentication state listener
    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                getDoc(doc(db, "users", currentUser.uid)).then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUser(userData);
                        localStorage.setItem('user-info', JSON.stringify(userData));
                    }
                }).catch((err) => setError(err.message))
                    .finally(() => setLoading(false));
            } else {
                setUser(null);
                localStorage.removeItem('user-info');
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (inputs) => {
        setLoading(true);
        const trimmedInputs = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, value.trim()])
        );

        // prevent sign up with already existing username
        // reference to the user collection
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", trimmedInputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setLoading(false);
            throw new Error(`Oops! Someone else has already taken the username ${trimmedInputs.username}. Please try another.`);
        }

        try {
            const newUser = await createUserWithEmailAndPassword(auth, trimmedInputs.email, trimmedInputs.password);

            const user = {
                uid: newUser.user.uid,
                email: trimmedInputs.email,
                username: trimmedInputs.username,
                name: trimmedInputs.name,
                profilePicURL: '/default-avatar-v7.png',
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
            setLoading(false);
            if (err.code === 'auth/email-already-in-use') {
                throw new Error('This email address is already associated with an account. Please try logging in or use a different email address.');
            } else {
                throw new Error(err.message);
            }
        }

        setLoading(false);
    }

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

            if (userDoc.exists()) {
                const user = userDoc.data();
                localStorage.setItem('user-info', JSON.stringify(user));
                setUser(user);
            }
        } catch (err) {
            setLoading(false);
            if (err.code === 'auth/invalid-credential') {
                throw new Error('Oops! Your login credentials are invalid. Please check your email and password.');
            }
            throw new Error(err.message);
        }

        setLoading(false);
    }

    const logOut = async () => {
        setLoading(true);
        // if user
        try {
            await signOut(auth);
            localStorage.removeItem('user-info');
            setUser(null);
        } catch (err) {
            setError(err);
            setLoading(false);
            throw new Error(err.message);
        }

        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, login, logOut, error, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

