import React, {Component} from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav'
import Form from './form'

let dialogStyles = {
    width: '500px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '999',
    backgroundColor: '#eee',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
}

let dialogCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height:'30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
}

var userList= [
    {name:"Sam", email:"samv@gmail.com"}, 
    {name:"Tiger", email:"tigern@gmail.com"}, 
    {name:"Tiara", email:"tiara@gmail.com"}
]

class UserNavBar extends Component{
    constructor() {
        super()
        this.state = {
            userList: []
        };
      }

    componentDidMount() {
        this.setState({userList:userList})
    }
    // this calls on Form componenet, grabbing the data passed onto it by it's children componenets. and takes the data from 
    // addUser() and passes its values into this.props.addUser(user) and passes those values into UserNavBar/s parents component, 
    // in App.Js 

     //conditional rendering
     render() {
        // let dialog = (
        //     <div style={dialogStyles}>

        //         <button style={dialogCloseButtonStyles} onClick = {this.props.onClose} >
        //             x
        //             </button>
                
                
        //         <Form addUserToTable={(user) => this.props.addUser(user)} onChange={fields => this.onChange(fields)} hitThis={() => console.log('hitting this')} />

        //     </div>
        // );
        
        // if (!this.props.isOpen) {
        //     dialog = null
        // }

        return(

            <div>
                <Form addUserToTable={(user) => this.props.addUser(user)} onChange={fields => this.onChange(fields)} />
                <h3 className="Navigation"> User Management </h3> 
                
                <Nav className = "nav" fill variant="tabs" as="ul">
                    <Nav.Item as="li"> User </Nav.Item>
                    <Nav.Item as="li"> Group </Nav.Item>
                    <Nav.Item as="li"> Deleted </Nav.Item>
                </Nav>
                <div>
                    <br/>
                    
                </div>
            </div>
        )
    }
}

export default UserNavBar