import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import HistoryService from "../services/HistoryService";
import Table from 'react-bootstrap/Table';
import AuthService from "../services/auth.service";
import {Navigate, useNavigate} from "react-router-dom";


function History() {

    const [history, setHistory] = useState([])
    const [userName, setUserName] = useState('')
    const [page, setPage] = useState(0)

    if (!AuthService.getCurrentUser()) {
        toast.error("Please log in first")
        return <Navigate to={'/sign-in'}/>
    }
    useEffect(() => {
        setUserNameF().then(r => setUserName(r))
    },[userName])

    async function setUserNameF() {
        return await AuthService.getCurrentUser().username
    }


    useEffect(()=>{
        try {
            //todo un counter cu butoane si  la request dau numarul paginii pe care o vreau
            HistoryService.getHistoryByUserName(userName, page).then(response => {
                console.log(response.data)
                console.log(page)
                setHistory(response.data.histories)
                // renderHistory()

            })
        } catch (error) {
            toast.error("Error fetching data for you")
        }
    },[userName,page])

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

    const onClickDecrease =()=> {
        setPage(page - 1)
        console.log(page)

    }

    const onClickIncrease =()=>  {
        setPage(page + 1)
        console.log(page)

    }

    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Your rental history</h1>
            <div className={"table-responsive"}>
                <Table className={" table"}>
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
                {page > 0 &&
                    <button onClick={onClickDecrease}>Previous</button>
                }
                {
                    <button onClick={onClickIncrease}>Next</button>
                }
            </div>
        </div>
    )
}

export default History