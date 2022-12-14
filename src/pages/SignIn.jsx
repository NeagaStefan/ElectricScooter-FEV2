import {useRef, useState} from "react";
import React from 'react'
import {toast} from "react-toastify"
import {Link, Navigate, useNavigate} from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from '../assets/svg/visibility-svgrepo-com.svg'
import AuthService from "../services/auth.service";
import OAuth from "../components/OAuth";


function SignIn() {
    const navigate = useNavigate();
    if (AuthService.getCurrentUser()){
        toast.error("If you want to log in in another account, please log out first")
        return <Navigate to={'/'}/>
    }
    const form = useRef();

    const onClick=() => {
       navigate('/sign-up')
        window.location.reload()
    }

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
        await AuthService.login(email, password).then(
            () => {
                navigate("/");
                window.location.reload();
            })
        }catch(error) {
                toast.error('Bad user credentials')
            }
    };


    return (
        <>
            <div className={"pageContainer"}>
                <header>
                    <p className={"pageHeader"}>
                        Welcome Back
                    </p>
                </header>
                <form onSubmit={handleLogin} ref={form}>
                    <input type={"username"}
                           className={"emailInput"}
                           placeholder={"Email"}
                           id={'email'}
                           value={email}
                           onChange={onChange}/>
                    <div className={"passwordInputDiv"}>
                        <input type={showPassword ? 'text' : 'password'}
                               className={"passwordInput"}
                               placeholder={"Password"}
                               id={"password"}
                               value={password}
                               onChange={onChange}
                        />
                        <img src={visibilityIcon}
                             alt={"show password"}
                             className={'showPassword'}
                             onClick={() => setShowPassword((prevState) => !prevState)}/>
                    </div>
                    <Link to={'/forgot-password'} className={"forgotPasswordLink"}>
                        Forgot Password
                    </Link>
                    <div className={"signInBar"}>
                        <p className={"signInText"}>
                            Sign In
                        </p>
                        <button className={"signInButton"}>
                            <ArrowRightIcon fill={'#ffffff'} width="34px" height="34px"/>
                        </button>
                    </div>
                </form>
                <OAuth/>
                <Link  className={"registerLink"} onClick={onClick}>
                    Sign Up instead
                </Link>
            </div>
        </>
    )
}

export default SignIn