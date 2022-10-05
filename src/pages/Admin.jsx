import React, {useEffect, useState} from "react";
import ScooterService from "../services/ScooterService";
import '../styles.css'
import {useNavigate} from 'react-router-dom'

const Admin = () =>{
    const [term,setTerm] = useState('')
    const [scooters,setScooters]= useState([])
    let navigate = useNavigate();

    useEffect(() => {
        const searchScooters = async () => {
            const {data} = await ScooterService.getAllScooters()
            setScooters(data);
        }

        const timeoutId = setTimeout(() => {
            searchScooters()

        }, 100);
        return () => {
            clearTimeout(timeoutId);
        }
    },[]);

    const onPositionClick = async () => {
        const {data} = await ScooterService.getScootersByPosition(term)
        setScooters(data);
        reRenderList()
    }
    const onIdClick = async () =>{
        const {data} = await ScooterService.getScooterById(term)
        setScooters(data);
        reRenderList()
    }
    const onStatusClick = async () =>{
        const {data} = await ScooterService.getScootersByStatus(term)
        setScooters(data);
        reRenderList();
    }
    const onPriceClick = async () =>{
        const {data} = await ScooterService.getScootersByBattery(term)
        setScooters(data);
        reRenderList()
    }
    const editScooter = (scooterId)=>{
        navigate("/scooter/edit",{ state: {scooterId:scooterId}}
    );
    }
    const deleteScooter = async (scooterId)=> {
        ScooterService.deleteScooterById(scooterId).then(async () => {
            const {data} = await ScooterService.getAllScooters()
            setScooters(data)
            reRenderList()
        })
    }

    const  addScooter=()=>{
        navigate('/employee')
    }

    const reRenderList = () => {
        if (scooters[0]){
            return scooters.map((scooter) => {
                return (
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
            })
        }else return null;


    }


    return(
        <div >
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
            <table className={"table table-active"}>
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
                {reRenderList()}
                </tbody>
            </table>

        </div>
    )

}
export default Admin