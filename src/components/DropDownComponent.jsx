import React,{useState,useEffect, useRef} from 'react'

const DropDownComponent = ({label,options, selected, onSelectedChange}) => {
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
        if (option.scooterId === selected.scooterId){
            return null;
        }
        if (!option){
            return (
                <div>
                    "No scooters available"
                </div>)
        }
        return (
            <div key={option.scooterId} className={"item"}
                 onClick = {()=> onSelectedChange(option)}>
                Scooter id:{option.scooterId} price: {option.price}
            </div>
        )
    })
    if(selected){
    return (
        <h1>
            <div ref ={ref} className={"ui form"}>
                <div className={"field"}>
                    <label className={"label"}>{label}</label>
                    <div className={`ui selection dropdown ${open ? 'visible active':''}`} onClick={()=> setOpen(!open)}>
                        <i className={"dropdown icon"}></i>
                        <div className={"text"}>
                            Scooter id: {selected.scooterId} price: {selected.price}
                        </div>
                        <div className={`menu ${open ? 'visible transition':''}`}>
                            {renderedOptions}
                        </div>
                    </div>
                </div>
            </div>
        </h1>
    )
}}

export default DropDownComponent;