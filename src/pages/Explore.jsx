import React, {useEffect, useState} from 'react'
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Explore() {
    const navigate = useNavigate()
    const onLogout =()=> {
        AuthService.logout()
        navigate('/sign-in')
    }
    const Stopwatch = () => {
        const [time, setTime] = useState(0);
        const [running, setRunning] = useState(false);
        useEffect(() => {
            let interval;
            if (running) {
                interval = setInterval(() => {
                    setTime((prevTime) => prevTime + 10);
                }, 10);
            } else if (!running) {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [running]);
        return (
            <div className="pageContainer">
                <div className="numbers">
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                </div>
                <div className="buttons">
                    <button className={"formButtonActive"} onClick={() => {setRunning(true)}}>Start renting</button>
                    <button className={"formButtonActive"} onClick={() => {setRunning(false)
                        onStop(time)
                        setTime(0)}}>Stop renting</button>

                </div>
            </div>
        );
    }

        const onStart = () => {

        }

        const onStop = (time) => {

        }



    return (
        <div className={"pageContainer"}>
            <h1>Explore Page</h1>
            {<Stopwatch/>}

            <button type={"button"} className={"formButtonActive"}  onClick={onLogout}>Logout</button>
        </div>
    )
}

export default Explore