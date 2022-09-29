import {Navigate, Outlet, useNavigate,} from "react-router-dom";
import React, {useState} from "react";
import {useAuthStatus} from "../hooks/useAuthStatus";
import Profile from "../pages/Profile";

const PrivateRoute =  () => {
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false)
    async function switchPage(){
        const vara = await useAuthStatus()
        setLoggedIn(vara)
        console.log(loggedIn)
        if(loggedIn===true){
            return navigate('/profile')
        }else {
            return navigate('/sign-in')
        }
    }

switchPage()

}

export default PrivateRoute