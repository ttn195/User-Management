import React, {Component} from "react";
import firebase from './firebase.js'
import './App.css';


class Form extends Component {

    constructor() {
        super()
        /*initalizes values to null */
        this.state = {
            name: '',
            phone_number: '',
            email: '',
            Groups: '',
            isActive: ''
        }
        /* Manually bind this in class constructor */
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        this.handleGroupsChange = this.handleGroupsChange.bind(this)
        this.handleisActiveChange = this.handleisActiveChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
    } 
    handleNameChange(e) {
        this.setState({name: e.target.value})
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }
    handlePhoneNumberChange(e) {
        this.setState({phone_number: e.target.value})
    }
    handleGroupsChange(e) {
        this.setState({Groups: e.target.value})
    }
    handleisActiveChange(e) {
        this.setState({isActive: e.target.value})
    }

onSubmit(e) {
	e.preventDefault();
    let user = {
        name: this.state.name,
        email: this.state.email,
        phone_number: this.state.phone_number,
        Groups: this.state.Groups,
        isActive: this.state.isActive
    }

	firebase.firestore().collection('users').add(user)
		.then(() => {
            this.setState({name: ''})
			this.setState({email:''})
			this.setState({isActive:''})
			this.setState({phone_number:''})
			this.setState({Groups:''})
        })
    }
    render() {
        return (
        <form onSubmit={this.onSubmit} >
            <h2>Add Users</h2><br/>
            <input
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            />
            <br />

            <input
            name="email"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            />
            <br />
            <input
            name="phone_number"
            placeholder="phone number"
            value={this.state.phone_number}
            onChange={this.handlePhoneNumberChange}
            />
            <br />
            <input
            name="Groups"
            type="number"
            placeholder="Groups"
            value={this.state.Groups}
            onChange={this.handleGroupsChange}
            />
            <br />
            <input
            name="isActive"
            placeholder="isActive"
            value={this.state.isActive}
            onChange={this.handleisActiveChange}
            /> 
            <br />
            <br />
            <button 
            /*calls the function addUser() when submit button is clicked, and retrieves the updated values of userList, passing the 
            userData onto its parent componenet, UserNavBar.js*/
                onClick={() => {
                    let user = {
                        name: this.state.name,
                        email: this.state.email,
                        phone_number: this.state.phone_number,
                        Groups: this.state.Groups,
                        isActive: this.state.isActive
                    }
                    this.props.addUser(user)
                }}
                /* onClose automatically closes when submit button is clicked*/
                onClose={() => this.setState({ isOpen: false})}
                onChange={fields => this.onChange(fields)}
                > submit</button>
        </form>
        )
    }
}

export default Form