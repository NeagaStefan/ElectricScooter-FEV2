import React, {useEffect, useState} from 'react'
import AuthService from "../services/auth.service";
import {Navigate, useNavigate} from "react-router-dom";
import CustomerService from "../services/CustomerService";
import {toast} from "react-toastify";

function Profile() {
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cardNumber: '',
        cardCSV: '',
        cardExpDate: '',})

    const navigate = useNavigate();
    if (!AuthService.getCurrentUser()) {
        toast.error("Please log in first")
        return <Navigate to={'/sign-in'}/>
    }
    useEffect(() => {
        async function fetchData() {

        if (formData.name === '') {
            try {
                const user = await CustomerService.findUser(AuthService.getCurrentUser().username)

                setFormData({
                    name: AuthService.getCurrentUser().username,
                    email: AuthService.getCurrentUser().email,
                    cardNumber: user.data.cardNumber,
                    cardCSV: user.data.cardCSV,
                    cardExpDate: user.data.cardExpDate,
                })

            } catch (error) {
                toast.error("You are not logged in")
                return <Navigate to={'/sign-in'}/>

            }
        }}
        fetchData()
    } )

    // useEffect(() => {
    //     if (formData.username) {
    //         const user = CustomerService.findUser(formData.name)
    //         if (user.cardNumber!== null) {
    //             setFormData({
    //                 cardNumber: user.cardNumber,
    //                 cardCSV: user.cardCSV,
    //                 cardExpDate: user.cardExpDate,
    //             })
    //         }
    //
    //     }
    // }, [])

    const {name, email, cardNumber, cardCSV, cardExpDate} = formData
    const onLogout = () => {
        AuthService.logout()
        navigate('/sign-in')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
                await CustomerService.updateUser(email, {username: name,cardNumber:cardNumber,cardExpDate:cardExpDate,cardCSV:cardCSV})
                toast.success('The details have been changed')

        } catch (error) {
            toast.error('Could not update profile details')
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

//todo ceasul sa mearga pana dai stop indiferent ca ai plecat pe alta pagina sau nu, si sa se nu poti da log out fara sa il opresti
//todo visibility icon de refacut

    return (
        <div className={"profile"}>
            <header className={"profileHeader"}>
                <p className={"pageHeader"}>My profile</p>
                <button type={"button"} className={"logOut"} onClick={onLogout}>Log out</button>
            </header>
            <main>
                <div className={"profileDetailsHeader"}>
                    <p className={"profileDetails"}>Personal details</p>
                    <p className={"changePersonalDetails"} onClick={(event) => {
                        changeDetails && onSubmit(event)
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>
                <div className={"profileCard"}>
                    <form>
                        <label>Username:</label>
                        <input type="text" id={"name"}
                               className={!changeDetails ? "profileName" : 'profileNameActive'}
                               disabled={!changeDetails}
                               value={name}
                               onChange={onChange}
                        />
                        <label>Email:</label>
                        <input type="text" id={"email"}
                               className={!changeDetails ? "profileEmail" : 'profileEmailActive'}
                               disabled={!changeDetails}
                               value={email}
                               onChange={onChange}
                        />
                        <label>Card number:</label>
                        <input type="text" id={"cardNumber"}
                               className={!changeDetails ? "profileName" : 'profileNameActive'}
                               disabled={!changeDetails}
                            value={cardNumber}
                               onChange={onChange}
                        />
                        <label>Card CSV:</label>
                        <input type="text" id={"cardCSV"}
                               className={!changeDetails ? "profileName" : 'profileNameActive'}
                               disabled={!changeDetails}
                            value={cardCSV}
                               onChange={onChange}
                        />
                        <label>Card expiration date:</label>
                        <input type="text" id={"cardExpDate"}
                               className={!changeDetails ? "profileName" : 'profileNameActive'}
                               disabled={!changeDetails}
                            value={cardExpDate}
                               onChange={onChange}
                        />
                    </form>
                </div>
            </main>
        </div>)
}

export default Profile