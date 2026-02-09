import React, { createContext, useState, useEffect, useContext } from "react"; 
// we had not put React inside{ } because it is going to be imported by deafult from "react" 
// but if you want to import multiple named items from module you need to put it inside {  }


//to check is user logged in or not we had created this
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);//initially setting curent user as null means no one is login
    useEffect(() => {
        const userId = localStorage.getItem('userId'); //checking the user from local storage 
        if (userId) {
            setCurrentUser(userId);  //setting the current user using his id
        }
    }, []);

    const value = {
        currentUser, setCurrentUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}