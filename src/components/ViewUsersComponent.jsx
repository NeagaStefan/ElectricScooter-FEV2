import React, {useEffect, useState} from 'react';
import CustomerService from "../services/CustomerService";
import '../styles.css'
import {useNavigate} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";

const ViewUsersComponent = () => {
    const [term,setTerm] =useState('')
    const [customers,setCustomers] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        const searchCustomers = async () => {
            const {data} = await CustomerService.getCustomer()
            setCustomers(data);
        }

        const timeoutId = setTimeout(() => {
            searchCustomers()

        }, 100);
        return () => {
            clearTimeout(timeoutId);
        }
    },[]);

    const editCustomer=(customerId)=>{
        history.push(`/admin/updating/customer/${customerId}`)

    }
    const addCustomer =()=>{
        history.push('/admin/generation/employee')
    }
    const deleteCustomer = (customerId)=> {
        CustomerService.deleteCustomerById(customerId).then(res => {
            this.setState({customer: this.state.customer.filter(customer => customer.customerId !== customerId)})
        })
    }
    const searchId = async () => {
        const {data} = await CustomerService.getCustomerById(term);
        setCustomers(data);
        renderCustomers();
    }
    const searchFirstName = async () => {
        const {data} = await CustomerService.getCustomerByFirstName(term);
        setCustomers(data);
        renderCustomers();
    }
    const searchLastName= async () => {
        const {data} = await CustomerService.getCustomerByLastName(term);
        setCustomers(data);
        renderCustomers();
    }
    const searchEmail= async () => {
        const {data} = await CustomerService.getCustomerByEmail(term);
        setCustomers(data);
        renderCustomers();
    }

    const renderCustomers= ()=>{
        if(customers[0]) {
            return customers.map((customer) => {
                return (
                    <tr key={customer.customerId}>
                        <td>{customer.customerId}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.deleted}</td>

                        <td>
                            <button className={"btn btn-info bg-info"}
                                    onClick={() => editCustomer(customer.customerId)}>Edit
                            </button>
                            <button style={{marginLeft: "10px"}} className={"btn btn-danger bg-danger"}
                                    onClick={() => deleteCustomer(customer.customerId)}>Delete
                            </button>
                        </td>
                    </tr>
                )
            })
        }else return null;

    }


    return (

        <div className={"customersAvailable"}>

            <h1 className={"text-center"}>Customers of the app</h1>
            <div className={"top-part"}>
                <div className={"row"}>
                    <div className={"ui form"}>
                        <div className={"field"}>
                            <label>Enter Search Term</label>
                            <input className={"input"}
                                   value={term}
                                   onChange={(e) => setTerm(e.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className={"grid"}>
                    <hr />
                    <button className={"btn btn-success "} onClick={searchId} >Search by id</button>
                    <button className={"btn btn-success "} onClick={searchFirstName}>Search by first name</button>
                    <button className={"btn btn-success "} onClick={searchLastName} >Search by last name</button>
                    <button className={"btn btn-success "} onClick={searchEmail}>Search by email</button>
                    <hr/>
                    <button className={"btn btn-success "}  >Add customer</button>
                    <hr/>
                </div>
            </div>
            <div className={"row"}>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <td> Customer Id</td>
                        <td> First Name</td>
                        <td> Last name</td>
                        <td> Email</td>
                        <td>Deleted</td>
                    </tr>
                    </thead>
                    <tbody className={"table table-striped table-bordered"}>
                    {renderCustomers()}
                    </tbody>
                </table>


            </div>
        </div>
    )


}

export default ViewUsersComponent;