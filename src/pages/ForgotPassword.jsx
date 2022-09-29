import React from 'react'
import {useState} from "react";
import{Link} from "react-router-dom";
import {toast} from "react-toastify";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
    const[email, setEmail] = useState('')
    const onChange = e => setEmail(e.target.value)

    const onSubmit = async (e) =>{
        e.preventDefault()
        try{
            toast.success("T he email was sent")
        }catch (error) {
            toast.error("Could not send the email")
        }
    }
    return (
        <div className={"pageContainer"}>
            <header>
                <p className={"pageHeader"}>Forgot password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input type={"email"}
                        className={"emailInput"}
                        id={"email"}
                           value={email}
                           placeholder={"Email"}
                           onChange={onChange}
                    />
                    <Link className={"forgotPasswordLink"} to={'/sign-in'}> Sign In</Link>
                    <div className={"signInBar"}>
                        <div className={"signInText"}>Send reset link</div>
                        <button className={"signInButton"}>
                            <ArrowRightIcon fill ='#ffffff' width={"34px"} height={"34px"} />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword