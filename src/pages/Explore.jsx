import React, {useEffect, useState} from 'react'
import AuthService from "../services/auth.service";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import customerService from "../services/CustomerService";
import DropDownComponent from "../components/DropDownComponent";
import ScooterService from "../services/ScooterService";
import DropDownLocations from "../components/DropDownLocations";
import CustomerService from "../services/CustomerService";

import usePrompt from "../hooks/useBlocker";


function Explore() {

    const options = [
        {
            label: 'Astra',
            value: 'Astra'
        },
        {
            label: 'Bartolomeu',
            value: 'Bartolomeu'
        },
        {
            label: 'Centru',
            value: 'Centru'
        },
        {
            label: 'Craiter',
            value: 'Craiter'
        },
        {
            label: 'Darste',
            value: 'Darste'
        },
        {
            label: 'Florilor',
            value: 'Florilor'
        },
        {
            label: 'Noua',
            value: 'Noua'
        },
        {
            label: 'Poiana',
            value: 'Poiana'
        },
        {
            label: 'Scriitorilor',
            value: 'Scriitorilor'
        },
        {
            label: 'Stupini',
            value: 'Stupini'
        },
        {
            label: 'Schei',
            value: 'Schei'
        },
        {
            label: 'Triaj',
            value: 'Triaj'
        },
        {
            label: 'Tractorul',
            value: 'Tractorul'
        },
        {
            label: 'Valea',
            value: 'Valea'
        },
        {
            label: 'Charging',
            value: 'Charging'
        }, {
            label: 'Deposit',
            value: 'Deposit'
        },
    ]

    const [userName, setUserName] = useState('')
    const [scootersAvailable, setScootersAvailable] = useState([])
    const [selected, setSelected] = useState({})
    const [selectedPos, setSelectedPos] = useState(options[0])
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [canStart, setCanStart]= useState(false);
    const [isDirty,setIsDirty]= useState(false)

    if (!AuthService.getCurrentUser()){
        toast.error("Please log in first")
        return <Navigate to={'/sign-in'}/>
    }

    useEffect(() => {

        async function setUserNameF() {
            return await AuthService.getCurrentUser().username
        }

        setUserNameF().then(r => setUserName(r))
    },[])

    useEffect(()=>{
        async function setScooterAvailable() {

            const data = await ScooterService.getAvailableScooters()
            setSelected(data.data[0])
            return data
        }
        setScooterAvailable().then(r => setScootersAvailable(r.data))
        setSelected(scootersAvailable[0])

        async  function verifyStart () {
            const userDetails = await CustomerService.findUser(userName);
            if(userDetails.data.cardNumber && userDetails.data.cardExpDate && userDetails.data.cardCSV ){
                setCanStart(true);
            }
        }
        verifyStart()

    }, [userName])

    const onStart = () => {
        console.log(canStart)
        if(canStart===true) {
            setRunning(true)
            try {
                customerService.startRenting(userName, selected.scooterId).then(
                    setIsDirty(true),
                    toast.success("The renting has started"))
            } catch (error) {
                toast.error(error.message)
            }
        }else {
            toast.error("Save your card details to rent")
        }

    }

    const onStop = () => {
        console.log(selectedPos)
        if (selectedPos != null) {
            try {
                customerService.stopRenting(userName, selected.scooterId, selectedPos.value).then(
                    toast.success("The rental has stopped")
                )
            } catch (error) {
                toast.error("Aloooo")
            }
        } else {
            toast.error("Please select a zone first")
        }
    }


    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
                console.log(time)
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);


    const renderedClock = (

        <div className="pageContainer">
            <div className="numbers">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            </div>
            <div className={"price-tag"}>
                {selected &&
                    <div>Total price: { Math.floor((time / 60000) % 60).toFixed(2)*selected.price+selected.price}
                    </div>
                }
            </div>
            <div className={"buttonsContainer"}>

                {!running &&
                    <button className={"formButtonActive"} onClick={() => {
                        onStart()
                    }}>Start renting</button>
                }
                {running && selectedPos &&

                    <button type="button" className={"formButtonStop"} onClick={() => {
                        setRunning(false)
                        onStop()
                        setTime(0)
                    }}>Stop renting</button>
                }
            </div>
        </div>
    );


    return (
        <div>
            <h1 className={"title"}>
                Electronic scooter app
            </h1>
            <div className={"body"}>
                <div className={"form-signin"}>
                    {!running &&
                        <DropDownComponent label="Select one of the available scooters" options={scootersAvailable}
                                           selected={selected} onSelectedChange={setSelected}/>
                    }
                    {running &&
                        <DropDownLocations label="Select one safe zones" options={options} selectedPos={selectedPos}
                                           onSelectedChange={setSelectedPos}/>
                    }
                    {renderedClock}


                </div>

            </div>
        </div>
    )
}

export default Explore