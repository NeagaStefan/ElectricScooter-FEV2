import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import HistoryService from "../services/HistoryService";
import Table from 'react-bootstrap/Table';
import AuthService from "../services/auth.service";


function History() {

    const [history, setHistory] = useState([])
    const [userName, setUserName] = useState('')


    async function setUserNameF(){
        return  await AuthService.getCurrentUser().username
    }

    setUserNameF().then(r=>setUserName(r))

    if (history.length===0) {
        try {
             HistoryService.getHistoryByUserName(userName).then(response => {
                setHistory(response.data)
                 // renderHistory()
            })
            } catch (error) {
                toast.error("Error fetching data for you")
            }


        }

    const renderHistory = (
        history.map((history) => <tr key={history.rentalId}>
            <td>{history.rentalId}</td>
            <td>{history.scooterId}</td>
            <td>{history.userName}</td>
            <td>{history.timeSpent}</td>
            <td>{history.price}</td>
            <td>{history.startDate}</td>
            <td>{history.stopDate}</td>
            <td>{history.totalPrice}</td>
        </tr>)
    )

    return (
        <div className={"historysAvailable"}>
            <h1 className={"text-center"}>Your rental history</h1>
            <div className={"row"}>
                <Table className={" striped bordered hover"} variant="dark">
                    <thead>
                    <tr>
                        <th> Rental Id</th>
                        <th> Scooter Id</th>
                        <th> User name</th>
                        <th> Time spent</th>
                        <th>Price</th>
                        <th>Start Data</th>
                        <th>Stop data</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody className={"table table-striped table-bordered"}>

                    {renderHistory}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default History