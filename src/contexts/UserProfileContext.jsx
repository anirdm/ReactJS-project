import { React, createContext, useContext, useReducer, useCallback, useState } from "react";

const UserProfileContext = createContext();

export const useUserProfile = () => {
    return useContext(UserProfileContext);
}

export const UserProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    return (
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          {children}
        </UserProfileContext.Provider>
      );
    
}






