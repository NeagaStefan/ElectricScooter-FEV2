import {useState} from "react";
import React from 'react'
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import AuthService from "../services/auth.service";
import OAuth from "../components/OAuth";


function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',

    })
    const {email, password, userName} = formData

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(userName, email, password)
            navigate("/profile")
            window.location.reload()
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

return (
    <>
        <div className={"pageContainer"}>
            <header>
                <p className={"pageHeader"}>
                    Welcome Back
                </p>
            </header>
            <form onSubmit={handleRegister}>
                <input type={"text"}
                       className={"nameInput"}
                       placeholder={"Username"}
                       id={'userName'}
                       value={userName}
                       onChange={onChange}/>
                <input type={"email"}
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
                <div className={"signUpBar"}>
                    <p className={"signUpText"}>
                        Sign Up
                    </p>
                    <button className={"signInButton"}>
                        <ArrowRightIcon fill={'#ffffff'} width="34px" height="34px"/>
                    </button>
                </div>
            </form>

            <OAuth/>

            <Link to="/sign-in " className={"registerLink"}>
                Sign In instead
            </Link>
        </div>
    </>
)
}

export default SignUp