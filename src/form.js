import React, {Component, Fragment} from "react";
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
        this.onAddUser = this.onAddUser.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.showAddUserBox = this.showAddUserBox.bind(this)
        this.populateUserFields = this.populateUserFields.bind(this)
        
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
    closeDialog() {
        const dialogForm = document.getElementById("dialogForm")
        dialogForm.close()
        this.setState({
            name: '',
            email: '',
            isActive:'',
            phone_number:'',
            Groups:'',
        })
    }

    //Shows Add User Form when addUserBtn clicked
    showAddUserBox() {
        const dialogForm = document.getElementById("dialogForm")
        dialogForm.showModal()
        if (this.props.editUserAction) {
            console.log("Edit User Action")
            this.props.populateUserFields()
        }   
    }

    populateUserFields(userData) {
        const dialogForm = document.getElementById("dialogForm")
        dialogForm.showModal()
        let user = {
            name: this.state.userData.name,
            email: this.state.userData.email,
            phone_number: this.state.userData.phone_number,
            Groups: this.state.userData.Groups,
            isActive: this.state.userData.isActive
        }
        this.props.handler(user)
    }    

    onAddUser() {
        console.log("Adding new user in onAddUser [Form.js]")
        let user = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            Groups: this.state.Groups,
            isActive: this.state.isActive
        }
        this.props.addUserToTable(user)
        firebase.firestore().collection('users').add(user)
        .then(() => this.closeDialog())
    }
    render() {

        return(
            <Fragment>
                <menu>
                    <button id="addUserBtn" onClick={this.showAddUserBox}>Add Users </button>
                </menu>
                <div>
                
                <dialog id="dialogForm">
                    <button onClick={this.closeDialog}>x</button>
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
                            placeholder="email"
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
                            placeholder="groups"
                            type="number"
                            value={this.state.Groups}
                            onChange={this.handleGroupsChange}
                        />
                        <br /> 

                        {/* <select name="isActive" type="string" value="{this.state.isActive}" onChange="{this.handleisActiveChange}">
                        <option value="teen">True</option>
                        <option value="adult">False</option>
                        </select> */}

                        <input
                            name="isActive"
                            placeholder="isActive"
                            value={this.state.isActive}
                            onChange={this.handleisActiveChange}
                        />
                        <br /> 

                        <menu>
                            <button id="cancel" onClick={this.closeDialog}>Cancel </button>
                            <button id="submitBtn" onClick={this.onAddUser}>Submit </button>
                        </menu>
                    {/* </form> */}
                </dialog>
            </div>
        </Fragment>
        )
    }
}

export default Form