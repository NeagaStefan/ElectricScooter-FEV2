import React, {useState} from 'react'
import AuthService from "../services/auth.service";
import {Navigate, useNavigate} from "react-router-dom";
import CustomerService from "../services/CustomerService";
import {toast} from "react-toastify";

function Profile() {
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({})

    const navigate = useNavigate();
    if (!AuthService.getCurrentUser()){
        toast.error("Please log in first")
        return <Navigate to={'/sign-in'}/>
    }
    if (formData.name == null) {
        try {
            setFormData({
                name: AuthService.getCurrentUser().username,
                email: AuthService.getCurrentUser().email,
            })
            console.log(formData)
        } catch (error) {
            toast.error("You are not logged in")
            return <Navigate to={'/sign-in'}/>

        }
    }
    const {name, email} = formData
    const onLogout = () => {
        AuthService.logout()
        navigate('/sign-in')
}

    const onSubmit = async (event) =>{
        event.preventDefault()
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
//todo ceasul sa mearga pana dai stop indiferent ca ai plecat pe alta pagina sau nu, si sa se nu poti da log out fara sa il opresti
   //todo paginile pnetru admin, cu componenta de navbad doar pentru el si cu pagini separate si securizate
    //todo de facut sa mearga update-ul de detalii si sa nu poti inchiria daca nu ai datele cardului
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
                                onChange={()=>onChange}
                         />
                         <input type ="text" id={"email"}
                                className={!changeDetails ? "profileEmail":'profileEmailActive'}
                                disabled={!changeDetails}
                                value={email}
                                onChange={()=>onChange}
                         />
                     </form>
                 </div>
             </main>
    </div>


    )

}

export default Profile