import React, {useEffect, useState} from "react";
import ScooterService from "../services/ScooterService";
import '../styles.css'
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom'
import ReactPaginate from "react-paginate";
import "../styles.css";
import {toast} from "react-toastify";

const PER_PAGE = 10;

const Admin = () =>{
    const [term,setTerm] = useState('')
    const [scooters,setScooters]= useState([])
    const [page, setPage] = useState(0)
    const [pageNum, setPageNum]= useState(1)
    let navigate = useNavigate();

    useEffect(() => {
            try {
                console.log(page)
                ScooterService.getAllScooters(page).then(response=> {
                if (response.data) {
                    setScooters(response.data.scooters);
                    setPageNum(response.data.totalPages)
                } else return ("you have no data")
                })
            } catch (error) {
                toast.error("Error fetching data for you")
            }

    },[page]);

    function handlePageClick({ selected: selectedPage }) {
        setPage(selectedPage);

    }

    const offset = page * PER_PAGE;

    const currentPageData = scooters
        .slice(offset, offset + PER_PAGE)
        .map(({ thumburl }) => <img src={thumburl} />);

    const onPositionClick = async () => {
        const {data} = await ScooterService.getScootersByPosition(term)
        setScooters(data);

    }

    const onIdClick = async () =>{
        const {data} = await ScooterService.getScooterById(term)
        setScooters(data);

    }

    const onStatusClick = async () =>{
        const {data} = await ScooterService.getScootersByStatus(term)
        setScooters(data);

    }

    const onPriceClick = async () =>{
        const {data} = await ScooterService.getScootersByBattery(term)
        setScooters(data);

    }

    const editScooter = (scooterId)=> {
        navigate("/scooter/edit", {state: {scooterId: scooterId}});
    }

    const deleteScooter = async (scooterId)=> {
        ScooterService.deleteScooterById(scooterId).then(async () => {
            const {data} = await ScooterService.getAllScooters()
            setScooters(data)

        })
    }

    const  addScooter=()=>{
        navigate('/scooter')
    }

    const renderList =  (
            scooters.map((scooter) =>

                    <tr key={scooter.scooterId}>
                        <td>{scooter.scooterId}</td>
                        <td>{scooter.scooterModel}</td>
                        <td>{scooter.position}</td>
                        <td>{scooter.batteryPercentage}</td>
                        <td>{scooter.status}</td>
                        <td>
                            <button className={"btn btn-info bg-info"}
                                    onClick={() => editScooter(scooter.scooterId)}>Edit
                            </button>
                            <button style={{marginLeft: "10px"}} className={"btn btn-danger bg-danger"}
                                    onClick={() => deleteScooter(scooter.scooterId)}>Delete
                            </button>
                        </td>
                    </tr>

            )
    )


    return(
        <div className={"container"}>
            <div className={"top-part"}>
                <div className={"ui form"}>
                    <div className={"field"}>
                        <label>Enter Search Term</label>
                        <input className={"input"}
                               value={term}
                               onChange={(e) => setTerm(e.target.value)}/>
                    </div>
                </div>
                <div className={"grid"}>
                    <hr />
                    <button className={"btn btn-success "} onClick={onPositionClick}>Search by position</button>
                    <button className={"btn btn-success "} onClick={onIdClick} >Search by id</button>
                    <button className={"btn btn-success "} onClick={onStatusClick} >Search by status</button>
                    <button className={"btn btn-success "} onClick={onPriceClick} >Search battery under</button>
                    <hr/>
                    <button className={"btn btn-success "} onClick={addScooter} >Add scooter</button>
                    <hr/>
                </div>
            </div>
            <div className={"table-responsive"}>
            <Table className={" table"}>
                <thead>
                <tr>
                    <td>Scooter Id</td>
                    <td> Model</td>
                    <td> Position</td>
                    <td> Battery </td>
                    <td>Status</td>
                    <td> Action</td>
                </tr>
                </thead>
                <tbody className={"table table-striped table-bordered"}>
                {renderList}
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

        </div>
    )

}
export default Admin