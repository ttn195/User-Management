import React, {Component} from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

class UserNavBar extends Component{
    
    //Calls on Form componenet and opens the add user form once the "Add Users" button is clicked.
    render() {
        return(
            <div>
                <h3 className="Navigation"> User Management </h3> 
                <Nav className = "nav" fill variant="tabs" as="ul">
                    <Nav.Item><Link to='/'>Users</Link></Nav.Item>
                    <Nav.Item><Link to='/'>Groups</Link></Nav.Item>
                    <Nav.Item><Link to='/DeletedTable'>Deleted</Link></Nav.Item>
                </Nav>
            </div>
        )
    }
}

export default UserNavBar
