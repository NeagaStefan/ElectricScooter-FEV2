import {Navigate, Outlet, } from "react-router-dom";
import React from "react";
import {useAuthStatus} from "../hooks/useAuthStatus";
import AuthService from "../services/auth.service";

const PrivateRoute =  () => {
    const loggedIn = useAuthStatus().loggedIn

    return loggedIn ? <Outlet/> : <Navigate to={'/sign-in'}/>

}

export default PrivateRoute