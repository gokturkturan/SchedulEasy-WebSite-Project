import React,{useState,useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase-config";


const AuthContext = React.createContext({
    isLoggedIn: false,
    showGreetingMessage: false,
    setShowGreetingMessage: ()=>{},
    onLogout: () => {},
    onLogin: () => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [showGreetingMessage,setShowGreetingMessage] = useState(false);
    useEffect(()=>{
        const uid = localStorage.getItem("uid")
        if(uid !== undefined && uid !== null){
            setIsLoggedIn(true);
        }
    },[]);
    const logoutHandler = () => {
        signOut(auth);
        console.log(auth,"Logged out.");
        localStorage.removeItem("uid");
        localStorage.removeItem("userInfo");
        setIsLoggedIn(false);
        setShowGreetingMessage(false);
    };

    const loginHandler = () => {
        setIsLoggedIn(true);
        setShowGreetingMessage(true);
    };
    return(<AuthContext.Provider value= {{isLoggedIn:isLoggedIn, setShowGreetingMessage:setShowGreetingMessage,showGreetingMessage:showGreetingMessage,onLogout:logoutHandler, onLogin:loginHandler}}>{props.children}</AuthContext.Provider>)
};

export default AuthContext;