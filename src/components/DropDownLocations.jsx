import React, {useEffect, useRef, useState} from "react";

const DropDownLocations=({label,options, selectedPos, onSelectedChange}) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();


    useEffect(() => {
        const onBodyClick = (event)=>{
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener('click',onBodyClick)
        return () =>{
            document.body.removeEventListener('click',onBodyClick)
        };
    },[]);

    const renderedOptions = options.map((option) => {
        if (option.value === selectedPos.value){
            return null;
        }
        if (!option){
            return (
                <div>
                    "No scooters available"
                </div>)
        }
        return (
            <div key={option.value} className={"item"}
                 onClick = {()=> onSelectedChange(option)}>
                {option.value}
            </div>
        )
    })

    if(selectedPos){
        return (
            <h1>
                <div ref ={ref} className={"ui form"}>
                    <div className={"field"}>
                        <label className={"label"}>{label}</label>
                        <div className={`ui selection dropdown ${open ? 'visible active':''}`} onClick={()=> setOpen(!open)}>
                            <i className={"dropdown icon"}></i>
                            <div className={"text"}>
                                {selectedPos.value}
                            </div>
                            <div className={`menu ${open ? 'visible transition':''}`}>
                                {renderedOptions}
                            </div>
                        </div>
                    </div>
                </div>
            </h1>
        )
    }

}

export default DropDownLocations