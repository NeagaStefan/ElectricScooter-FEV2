import axios from "axios";
import authHeader from "./auth-header";
const CUSTOMER_URL="http://localhost:9000";

class CustomerService {


    updateUser(userEmail, user) {
        return axios.post(CUSTOMER_URL+`/customers/${userEmail}`,user,{headers: authHeader()})
    }

    startRenting(userName,scooterId) {
        return axios.post(CUSTOMER_URL+"/users/start",{userName,scooterId},{headers: authHeader()})
    }
    stopRenting(userName,scooterId,newLocation) {
        return axios.post(CUSTOMER_URL+`/users/stop`,{userName,scooterId,newLocation},{headers: authHeader()})
    }

}

export default new CustomerService()