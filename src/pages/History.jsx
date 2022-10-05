import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import HistoryService from "../services/HistoryService";
import Table from 'react-bootstrap/Table';
import AuthService from "../services/auth.service";
import {Navigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../styles.css";

const PER_PAGE = 10;

function History() {

    const [history, setHistory] = useState([])
    const [userName, setUserName] = useState('')
    const [page, setPage] = useState(0)
    const [pageNum, setPageNum]= useState(1)

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
            HistoryService.getHistoryByUserName(userName, page).then(response => {

                if(response.data) {
                    setHistory(response.data.histories)
                    setPageNum(response.data.totalPages)
                }
                else return("you have no data")
                // renderHistory()

            })
        } catch (error) {
            toast.error("Error fetching data for you")
        }
    },[userName,page])


    function handlePageClick({ selected: selectedPage }) {
            setPage(selectedPage);

    }

    const offset = page * PER_PAGE;

    const currentPageData = history
        .slice(offset, offset + PER_PAGE)
        .map(({ thumburl }) => <img src={thumburl} />);

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
    console.log(history)

    return (
        <div className={"container"}>
            <h1 className={"text-center"}>Your rental history</h1>

            {history.length !=0 &&
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
                <div className="App">
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={pageNum}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                    {currentPageData}
                </div>

            </div>
}
            {history.length ==0 &&
                <div>
                    <h2>You did not rent a scooter so far</h2>
                </div>
            }
        </div>
    )
}

export default History