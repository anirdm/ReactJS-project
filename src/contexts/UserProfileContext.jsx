import { React, createContext, useContext, useReducer, useCallback, useState } from "react";

const UserProfileContext = createContext();

export const useUserProfile = () => {
    return useContext(UserProfileContext);
}

export const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    /*const addPost = useCallback((post) => {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        posts: [post.id, ...prevProfile.posts],
      }));
    }, []);*/


    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          {children}
        </UserProfileContext.Provider>
      );
    

    // add 
    // delete
}

/*export function UserProfileProvider({ children }) {
    const initialState = {
        userProfile: null,
    };

    const [state, dispatch] = useReducer(userProfileReducer, initialState);

    return (
        <UserProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </UserProfileContext.Provider>
    );
}*/




