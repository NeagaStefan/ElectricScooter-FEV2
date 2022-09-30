import axios from "axios";
const SCOOTERS_URL = 'http://localhost:8088'

class ScooterService {
    headers: {
        Authorization: "user userPassword"
    }
    getAllScooters(){
        return axios.get(SCOOTERS_URL+'/scooters/admin')
    }

    getAvailableScooters(){

        return axios.get(SCOOTERS_URL+'/scooters',this.headers);

    }
    saveScooter(scooter){
        return axios.post(SCOOTERS_URL+'/scooters', scooter);
    }

    updateScooter(scooterId, scooter) {
        return axios.post(SCOOTERS_URL+`/scooters/${scooterId}`,scooter)
    }

    getScooterById(scooterId) {
        return axios.get(SCOOTERS_URL+`/scooters/${scooterId}`)
    }
    getScootersByPosition(position) {
        return axios.get(SCOOTERS_URL+`/scooters/position/${position}`)
    }

    deleteScooterById(scooterId) {
        return axios.delete(SCOOTERS_URL+`/scooters/${scooterId}`)
    }
    getScootersByStatus(status) {
        return axios.get(SCOOTERS_URL+`/scooters/status/${status}`)
    }
    getScootersByBattery(battery) {
        return axios.get(SCOOTERS_URL+`/scooters/battery/${battery}`)
    }
}
export default new ScooterService()
