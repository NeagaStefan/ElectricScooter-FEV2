import axios from "axios";
const CUSTOMER_URL="http://localhost:9000";

class CustomerService {


    updateUser(userEmail, user) {
        return axios.post(CUSTOMER_URL+`/customers/${userEmail}`,user)
    }

}

export default new CustomerService()