import React from "react";
import { useContext,useState,useEffect,useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const userInfo = useRef();

    function signup(email,password){
        createUserWithEmailAndPassword(auth,email,password);
        return;
    }

    function login(email,password){
        signInWithEmailAndPassword(auth,email,password);
        return;
    }

    function logout(){
        signOut(auth);
        return;
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    },[])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        userInfo,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}