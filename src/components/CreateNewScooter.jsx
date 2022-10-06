import React, {useState} from 'react';
import ScooterService from "../services/ScooterService";
import { useNavigate} from "react-router-dom";

export default function CreateNewScooter() {
    const navigate = useNavigate()

    const [scooter, setAllScooter] = useState({
        scooterId: '',
        scooterModel: '',
        status: '', position: ''
        , batterPercentage: ''
        , price: ''
    })

    const saveScooter = (e) => {
        e.preventDefault();
        let scooterr = {
            scooterModel: scooter.scooterModel, batteryPercentage: scooter.batteryPercentage,
            position: scooter.position, price: scooter.price, status: scooter.status
        };
        console.log(scooterr)
        console.log('scooter =>' + JSON.stringify(scooterr));
        ScooterService.saveScooter(scooterr).then(() => {
            navigate('/admin');
            window.location.reload()
        })
    }

    console.log(scooter)
    const changeScooterAllHandler = (event) => {
        setAllScooter({...scooter, [event.target.name]: event.target.value});
    }

    const cancel = () => {
        navigate("/admin");
        window.location.reload()
    }


    return (
        <div>
            <div className={"container"}>
                <div className={"row"}>
                    <div>
                        <h3 className={"text-center"}>Add scooter</h3>
                        <div className={"card-body"}>
                            <form>
                                <div className={"form-group"}>
                                    <label>Scooter Model: </label>
                                    <input placeholder="Scooter Model" name="scooterModel" className={"form-control"}
                                           value={scooter.scooterModel} onChange={changeScooterAllHandler}/>
                                </div>
                                <div className={"form-group"}>
                                    <label>Status: </label>
                                    <input placeholder="Status" name="status" className={"form-control"}
                                           value={scooter.status} onChange={changeScooterAllHandler}/>
                                </div>
                                <div className={"form-group"}>
                                    <label>Position: </label>
                                    <input placeholder="Position" name="position" className={"form-control"}
                                           value={scooter.position} onChange={changeScooterAllHandler}/>
                                </div>
                                <div className={"form-group"}>
                                    <label>Battery Percentage: </label>
                                    <input placeholder="Battery Percentage" name="batteryPercentage"
                                           className={"form-control"} value={scooter.batteryPercentage}
                                           onChange={changeScooterAllHandler}/>
                                </div>
                                <div className={"form-group"}>
                                    <label>Price: </label>
                                    <input placeholder="Price" name="price" className={"form-control"}
                                           value={scooter.price} onChange={changeScooterAllHandler}/>
                                </div>
                                <button className={"formButtonActiveEdit"} onClick={saveScooter}>Save</button>
                                <button className={"formButtonStopEdit"} onClick={cancel}
                                        style={{marginLeft: "10px"}}>Cancel
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

