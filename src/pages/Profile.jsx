import React, {useState} from 'react'
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import CustomerService from "../services/CustomerService";
import {toast} from "react-toastify";

function Profile() {
    const [formData,setFormData] =useState({
        name: AuthService.getCurrentUser().username,
        email: AuthService.getCurrentUser().email,
    })
    const[changeDetails,setChangeDetails]=useState(false)
    const navigate= useNavigate()

    const {name, email} = formData

    const onLogout =()=> {
        AuthService.logout()
        navigate('/sign-in')
    }

    const onSubmit =async () =>{
        try {
            if(AuthService.getCurrentUser().username!== name){
                await CustomerService.updateUser(email, {username:name})
                toast.success('The details have been changed')
            }
        }catch (error){
            toast.error('Could not update profile details')
        }
    }
    const onChange = (e)=> {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    return (
         <div className={"profile"}>
             <header className={"profileHeader"}>
                <p className={"pageHeader"}>My profile</p>
                 <button type={"button"} className={"logOut"} onClick={onLogout}>Log out</button>
             </header>
             <main>
                 <div className={"profileDetailsHeader"}>
                     <p className={"profileDetails"}>Personal details</p>
                     <p className={"changePersonalDetails"} onClick={()=>{
                         changeDetails && onSubmit()
                         setChangeDetails((prevState)=>!prevState)
                     }}>
                         {changeDetails ? 'done':'change'}
                     </p>
                 </div>
                 <div className={"profileCard"}>
                     <form>
                         <input type ="text" id={"name"}
                                className={!changeDetails ? "profileName":'profileNameActive'}
                                disabled={!changeDetails}
                                value={name}
                                onChange={onChange}
                         />
                         <input type ="text" id={"email"}
                                className={!changeDetails ? "profileEmail":'profileEmailActive'}
                                disabled={!changeDetails}
                                value={email}
                                onChange={onChange}
                         />
                     </form>
                 </div>
             </main>
    </div>


    )

}

export default Profile