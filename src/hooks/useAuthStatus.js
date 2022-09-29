import {useState,useEffect} from "react";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";

export const useAuthStatus = () =>{
    const [loggedIn, setLoggedIn]= useState(false)

    useEffect(()=>{

        if(authHeader || AuthService.getCurrentUser) {
            setLoggedIn(true)
        }else {
            setLoggedIn(false)
        }
    },[])
    console.log(loggedIn)
    return {loggedIn}
}