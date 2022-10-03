import React, {useEffect, useState} from 'react'
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import customerService from "../services/CustomerService";
import DropDownComponent from "../components/DropDownComponent";
import ScooterService from "../services/ScooterService";
import DropDownLocations from "../components/DropDownLocations";


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

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [scootersAvailable, setScootersAvailable] = useState([])
    const [selected, setSelected] = useState({})
    const [selectedPos, setSelectedPos] = useState({})


    const onLogout =()=> {
        AuthService.logout()
        navigate('/sign-in')
    }
    useEffect(()=>{

    async function setUserNameF(){
        return  await AuthService.getCurrentUser().username
    }
    setUserNameF().then(r=>setUserName(r))

    async function setScooterAvailable(){

       const data = await ScooterService.getAvailableScooters()
        setSelected(data.data[0])
        return data
    }
    setScooterAvailable().then(r=>setScootersAvailable(r.data))
        setSelected(scootersAvailable[0])
    },[])

    const onStart = () => {
        try {
            customerService.startRenting(userName, selected.scooterId).then(
                toast.success("The renting has started"))
        }catch (e){
            toast.error(e.message)
        }
        // setStarted(true)
        //todo when start is pressed dropdown is changed with a text ?
        console.log(selected.scooterId,userName)

    }

    const onStop = () => {
        if(selectedPos!=null) {
            try{
            customerService.stopRenting(userName, selected.scooterId, selectedPos.value).then(
                toast.success("The rental has stopped")
            )
            }catch (e){
                toast.error("Aloooo")
            }
        }else {
            toast.error("Please select a zone first")
        }
        // setStarted(false)
    }

        const [time, setTime] = useState(0);
        const [running, setRunning] = useState(false);

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
                <div className="buttons">
                    {!running &&
                    <button className={"formButtonActive"} onClick={() => {setRunning(true)
                        console.log(running)
                    onStart()
                    }}>Start renting</button>
                    }
                    {running &&
                        <button  type="button" class="btn btn-danger" onClick={() => {
                            setRunning(false)
                            onStop(time)
                            setTime(0)
                        }}>Stop renting</button>
                    }
                </div>
            </div>
        );



    return (

        <div className={"pageContainer"}>
            <h1>Explore Page</h1>
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
    )
}

export default Explore