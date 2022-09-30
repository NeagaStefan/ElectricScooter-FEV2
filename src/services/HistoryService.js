import axios from "axios";
const HISTORY_URL="http://localhost:9000/history";

class HistoryService  {

    getHistory () {
        return axios.get(HISTORY_URL);
    }
    saveHistory(history){
        return axios.post(HISTORY_URL+'/historys', history, this.headers);
    }

    updateHistory(historyId, history) {
        return axios.post(HISTORY_URL+`/historys/${historyId}`,history)
    }

    getHistoryById(historyId) {
        return axios.get(HISTORY_URL+`/historys/${historyId}`)
    }

    deleteHistoryById(historyId) {
        return axios.delete(HISTORY_URL+`/historys/${historyId}`)
    }

    async getHistoryByUserName(userName) {
        return await axios.get(HISTORY_URL + `/user/${userName}`)
    }

}

export default new HistoryService()