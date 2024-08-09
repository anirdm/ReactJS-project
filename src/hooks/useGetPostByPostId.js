import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetPostByPostId = (id) => {
    const [ post, setPost ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const postRef = doc(db, "posts", id);
                const postSnap = await getDoc(postRef);

                setPost(postSnap.data());
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    return { post, loading };
}

export default useGetPostByPostId;