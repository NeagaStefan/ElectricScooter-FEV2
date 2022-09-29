import {useLocation} from "react-router-dom";
import React from "react";
import {getAuth,signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {toast} from "react-toastify";
import googleIcon from '../assets/svg/googleIcon.svg'
import AuthService from "../services/auth.service";


function OAuth () {
    const location = useLocation()
    const onGoogleClick = async () => {
        try{ const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const  result = await signInWithPopup(auth,provider)
            const  user = result.user

            if(!user.email) {
                await  AuthService.register(user)
            }
        } catch (e) {
            toast.error('Could not authorize with google')
        }
    }


    return(
        <div className={"socialLogin"}>
            <p>Sign {location.pathname==='/sign-up'? 'up ' :'in '}
             with</p>
            <button className={"socialIconDiv"} onClick={onGoogleClick}>
                <img src={googleIcon} alt={"google"} className={"socialIconImg"}/>
            </button>
        </div>
    )
}
export default OAuth