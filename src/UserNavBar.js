import React, {Component} from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav'

class UserNavBar extends Component{
    
    //Calls on Form componenet and opens the add user form once the "Add Users" button is clicked.
    render() {
        return(
            <div>                
                <h3 className="Navigation"> User Management </h3> 
                <Nav className = "nav" fill variant="tabs" as="ul">
                    <Nav.Item as="li"> User </Nav.Item>
                    <Nav.Item as="li"> Group </Nav.Item>
                    <Nav.Item as="li"> Deleted </Nav.Item>
                </Nav>
            </div>
        )
    }
}

export default UserNavBar