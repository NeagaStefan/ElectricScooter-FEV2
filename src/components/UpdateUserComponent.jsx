import React, {Component} from 'react';
import CustomerService from "../services/CustomerService";
import {useParams} from "react-router-dom";

class UpdateUserComponent extends Component {
    constructor(props) {
        const {customer} = useParams();
        super(props)
        this.state = {
            customerId : customer,
            firstName:'',
            lastName:'',
            email:'',
            deleted:'',

        }
        this.changeUserNameHandler =this.changeUserNameHandler.bind(this)
        this.changeCustomerEmailHandler =this.changeCustomerEmailHandler.bind(this);
        this.changeCustomerPriceHandler = this.changeCustomerPriceHandler.bind(this);
        this.changeCustomerLastNameHandler = this.changeCustomerLastNameHandler.bind(this)
        this.changeCustomerFirstNameHandler = this.changeCustomerFirstNameHandler.bind(this)
        this.updateCustomer = this.updateCustomer.bind(this)
    }

    updateCustomer = (e) => {
        e.preventDefault();
        let customer = {userName:this.state.userName, email:this.state.email,
            lastName: this.state.lastName, firstName: this.state.firstName};
        console.log('customer =>' +JSON.stringify(customer));
        CustomerService.updateCustomer(this.state.customerId,customer).then(()=>{
            this.props.history.push('/admin/customers');
        })
    }

    componentDidMount() {
        CustomerService.getCustomerById(this.state.customerId).then((res) =>{
            let customer = res.data;
            this.setState({userName:customer.userName, email: customer.email,
                lastName: customer.lastName, price: customer.price, firstName: customer.firstName})
        })
    }

    changeUserNameHandler = (event) => {
        this.setState({userName:event.target.value});
    }
    changeCustomerFirstNameHandler = (event ) =>{
        this.setState({firstName: event.target.value});
    }

    changeCustomerLastNameHandler = (event) => {
        this.setState({lastName:event.target.value});
    }

    changeCustomerEmailHandler = (event) => {
        this.setState({email:event.target.value});
    }

    changeCustomerPriceHandler = (event) => {
        this.setState({price:event.target.value});
    }
    cancel () {
        this.props.history.push("/admin/customers");
    }

    render() {
        return (
            <div>

                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                            <h3 className={"text-center"}>Add customer</h3>
                            <div className={"card-body"}>
                                <form>
                                    <div className={"form-group"}>
                                        <label>Customer username: </label>
                                        <input placeholder="Username" name ="username" className={"form-control"} value={this.state.userName} onChange={this.changeUserNameHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>First name </label>
                                        <input placeholder="First name" name ="firstName" className={"form-control"} value={this.state.firstName} onChange={this.changeCustomerFirstNameHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>Last name: </label>
                                        <input placeholder="LastName" name ="lastName" className={"form-control"} value={this.state.lastName} onChange={this.changeCustomerLastNameHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label>Email: </label>
                                        <input placeholder="Email" name ="email" className={"form-control"} value={this.state.email} onChange={this.changeCustomerEmailHandler}/>
                                    <button className={"formButtonActiveEdit"} onClick={this.updateCustomer}>Save</button>
                                    <button className={"formButtonStopEdit"} onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateUserComponent;