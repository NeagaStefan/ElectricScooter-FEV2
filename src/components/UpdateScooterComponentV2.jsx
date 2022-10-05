// noinspection DuplicatedCode

import React, {Component} from 'react';
import ScooterService from "../services/ScooterService";
import HeaderComponent from "./HeaderComponent";



class UpdateScooterComponent extends Component {

    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            scooterId : this.props.match.params.scooterId,
            scooterModel:'',
            status:'',
            position:'',
            batteryPercentage:'',
            price:''

        }
        this.changeScooterModelHandler =this.changeScooterModelHandler.bind(this)
        this.changeScooterBatteryHandler =this.changeScooterBatteryHandler.bind(this);
        this.changeScooterPriceHandler = this.changeScooterPriceHandler.bind(this);
        this.changeScooterPositionHandler = this.changeScooterPositionHandler.bind(this)
        this.changeScooterStatusHandler = this.changeScooterStatusHandler.bind(this)
        this.updateScooter = this.updateScooter.bind(this)
    }
    updateScooter = (e) => {
        e.preventDefault();
        let scooter = {scooterModel:this.state.scooterModel, batteryPercentage:this.state.batteryPercentage,
            position: this.state.position, price: this.state.price, status: this.state.status};
        console.log('scooter =>' +JSON.stringify(scooter));
        ScooterService.updateScooter(this.state.scooterId,scooter).then( ()=>{
            this.props.history.push('/admin/scooters');
        })
        }

    componentDidMount() {
        console.log("Am ajuns aici")
        ScooterService.getScooterById(this.state.scooterId).then((res) =>{
            let scooter = res.data;
            console.log('scooter =>' +JSON.stringify(scooter));
            this.setState({scooterModel:scooter[0].scooterModel, batteryPercentage: scooter[0].batteryPercentage,
            position: scooter[0].position, price: scooter[0].price, status: scooter[0].status})
        })
    }

    changeScooterModelHandler = (event) => {
        this.setState({scooterModel:event.target.value});
    }
    changeScooterStatusHandler = (event ) =>{
        this.setState({status: event.target.value});
    }

    changeScooterPositionHandler = (event) => {
        this.setState({position:event.target.value});
    }

    changeScooterBatteryHandler = (event) => {
        this.setState({batteryPercentage:event.target.value});
    }

    changeScooterPriceHandler = (event) => {
        this.setState({price:event.target.value});
    }
    cancel () {
        this.props.history.push("/admin/scooters");
    }


    render() {
        const {scooterId} = this.props;
        console.log(scooterId)
        return (
            <div>
                <HeaderComponent/>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                            <h3 className={"text-center"}>Add scooter</h3>
                            <div className={"card-body"}>
                                <form>
                                    <div className={"form-group"}>
                                        <label>Scooter Model: </label>
                                        <input placeholder="Scooter Model" name ="scooterModel" className={"form-control"} value={this.state.scooterModel} onChange={this.changeScooterModelHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>Status: </label>
                                        <input placeholder="Status" name ="status" className={"form-control"} value={this.state.status} onChange={this.changeScooterStatusHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>Position: </label>
                                        <input placeholder="Position" name ="position" className={"form-control"} value={this.state.position} onChange={this.changeScooterPositionHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>Battery Percentage: </label>
                                        <input placeholder="Battery Percentage" name ="batteryPercentage" className={"form-control"} value={this.state.batteryPercentage} onChange={this.changeScooterBatteryHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>Price: </label>
                                        <input placeholder="Price" name ="price" className={"form-control"} value={this.state.price} onChange={this.changeScooterPriceHandler}/>
                                    </div>
                                    <button className={"btn btn-success"} onClick={this.updateScooter}>Save</button>
                                    <button className={"btn btn-primary"} onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateScooterComponent;