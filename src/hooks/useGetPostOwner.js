import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetPostOwner = (uid) => {
    const [ owner, setOwner ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);

    useEffect(() => {
        const getPostOwnerByOwnerId = async () => {
            try {
                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);

                setOwner(userSnap.data());
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getPostOwnerByOwnerId();
    }, [uid]);

    return { owner, loading };
}

export default useGetPostOwner;