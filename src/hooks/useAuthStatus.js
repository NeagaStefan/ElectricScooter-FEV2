import {useState, useEffect} from "react";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import {toast} from "react-toastify";

export const useAuthStatus = async () => {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        async function fetchData() {

            try {
                const header = await authHeader()
                console.log({header})
                const service = await AuthService.getCurrentUser().accessToken
                console.log({service})
                if (header.Authorization != null || service != null) {
                    setLoggedIn(true)



                } else {
                    setLoggedIn(false)

                }
            } catch (error) {
                toast.error("You have to log in first")
            }

                  
        } 

        fetchData()

    }, [AuthService.getCurrentUser()])
    console.log(loggedIn)
    return loggedIn



}