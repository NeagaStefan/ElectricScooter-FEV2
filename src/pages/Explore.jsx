import React from 'react'
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Explore() {
    const navigate = useNavigate()
    const onLogout =()=> {
        AuthService.logout()
        navigate('/sign-in')
    }
    return (
        <div>
            <h1>Explore Page</h1>
            {toast.success("welcome")}
            <button type={"button"} className={"logOut"} onClick={onLogout}>Log out</button>
        </div>
    )
}

export default Explore