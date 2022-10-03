import axios from "axios";
import authHeader from "./auth-header";

const SCOOTERS_URL = "http://localhost:9000"

class ScooterService {

    getAllScooters(){
        return axios.get(SCOOTERS_URL+'/scooters/admin',{headers: authHeader()})
    }

    getAvailableScooters(){

        return axios.get(SCOOTERS_URL+'/scooters',{headers: authHeader()});

    }
    saveScooter(scooter){
        return axios.post(SCOOTERS_URL+'/scooters', scooter,{headers: authHeader()});
    }

    updateScooter(scooterId, scooter) {
        return axios.post(SCOOTERS_URL+`/scooters/${scooterId}`,scooter,{headers: authHeader()})
    }

    getScooterById(scooterId) {
        return axios.get(SCOOTERS_URL+`/scooters/${scooterId}`,{headers: authHeader()})
    }
    getScootersByPosition(position) {
        return axios.get(SCOOTERS_URL+`/scooters/position/${position}`,{headers: authHeader()})
    }

    deleteScooterById(scooterId) {
        return axios.delete(SCOOTERS_URL+`/scooters/${scooterId}`,{headers: authHeader()})
    }
    getScootersByStatus(status) {
        return axios.get(SCOOTERS_URL+`/scooters/status/${status}`,{headers: authHeader()})
    }
    getScootersByBattery(battery) {
        return axios.get(SCOOTERS_URL+`/scooters/battery/${battery}`,{headers: authHeader()})
    }
}
export default new ScooterService()
