import axios from "axios";
import authHeader from "./auth-header";
const HISTORY_URL="http://localhost:9000/history";

class HistoryService  {

    getHistory () {
        return axios.get(HISTORY_URL);
    }
    saveHistory(history){
        return axios.post(HISTORY_URL+'/historys', history, {headers: authHeader()});
    }

    updateHistory(historyId, history) {
        return axios.post(HISTORY_URL+`/historys/${historyId}`,history, {headers: authHeader()})
    }

    getHistoryById(historyId) {
        return axios.get(HISTORY_URL+`/historys/${historyId}`,{headers: authHeader()})
    }

    deleteHistoryById(historyId) {
        return axios.delete(HISTORY_URL+`/historys/${historyId}`,{headers: authHeader()})
    }

    async getHistoryByUserName(userName) {
        return await axios.get(HISTORY_URL + `/user/${userName}`,{headers: authHeader()})
    }

}

export default new HistoryService()