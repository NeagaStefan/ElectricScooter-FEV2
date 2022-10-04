import React, {Component} from 'react';
import "../styles.css"
import {Link} from "react-router-dom";
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <header className={"header"}>
                    <Navbar bg="dark" variant={"dark"}>
                        <Nav className={"navbar-brand"}>
                            <Link to="/admin"><NavbarBrand >Definitely not Lime</NavbarBrand></Link>
                        </Nav>
                        <Nav className={"navbar-right"}>
                            <Link to="/scooters" className={"nav-link"}>Scooters</Link>
                            <Link to="/customers" className={"nav-link"}>Customers</Link>
                            <Link to="/admin/history" className={"nav-link"}>History</Link>
                        </Nav>
                    </Navbar>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;