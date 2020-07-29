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
        console.log("onSubmit [Form.js]")
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

    // render() {
    //     return (
    //     <form onSubmit={this.onSubmit} >
    //         <h2>Add Users</h2><br/>
    //         <input
    //         name="name"
    //         placeholder="name"
    //         value={this.state.name}
    //         onChange={this.handleNameChange}
    //         />
    //         <br />

    //         <input
    //         name="email"
    //         type="email"
    //         placeholder="Email"
    //         value={this.state.email}
    //         onChange={this.handleEmailChange}
    //         />
    //         <br />
    //         <input
    //         name="phone_number"
    //         placeholder="phone number"
    //         value={this.state.phone_number}
    //         onChange={this.handlePhoneNumberChange}
    //         />
    //         <br />
    //         <input
    //         name="Groups"
    //         type="number"
    //         placeholder="Groups"
    //         value={this.state.Groups}
    //         onChange={this.handleGroupsChange}
    //         />
    //         <br />
    //         <input
    //         name="isActive"
    //         placeholder="isActive"
    //         value={this.state.isActive}
    //         onChange={this.handleisActiveChange}
    //         /> 
    //         <br />
    //         <br />
    //         <button 
    //         /*calls the function addUser() when submit button is clicked, and retrieves the updated values of userList, passing the 
    //         userData onto its parent componenet, UserNavBar.js*/
    //             onClick={() => {
    //                 let user = {
    //                     name: this.state.name,
    //                     email: this.state.email,
    //                     phone_number: this.state.phone_number,
    //                     Groups: this.state.Groups,
    //                     isActive: this.state.isActive
    //                 }
    //                 this.props.addUser(user)
    //                 this.props.onClose()
    //             }}
    //             /* onClose automatically closes when submit button is clicked*/
    //             onChange={fields => this.onChange(fields)}
    //             > submit</button>
    //     </form>
    //     )
    // }


    render() {
        window.onload=function(){

            var addUserBtn = document.getElementById('addUserBtn');
            var dialogForm = document.getElementById('dialogForm');
            var selectEl = document.querySelector('select');
            var submitBtn = document.getElementById('submitBtn');

            // "Update details" button opens the <dialog> modally
            addUserBtn.addEventListener('click', function onOpen() {
                if (typeof dialogForm.showModal === "function") {
                    dialogForm.showModal();
                } else {
                    alert("The <dialog> API is not supported by this browser");
                }
            });

            // input sets the value of the submit button
            document.addEventListener('DOMContentLoaded', function () {
                selectEl.addEventListener('change', function onSelect(e) {  
                    submitBtn.value = selectEl.value;
                })
            });
            
            // dialogForm.addEventListener('submit', function onSubmit(e) {
            //     console.log("adding user inside render")
            //     e.preventDefault();
            // });

            // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
            dialogForm.addEventListener('cancelBtn', function onClose() {
            });
        }

        return(
        <div>
            <dialog id="dialogForm">
                <form method="dialog">
                <h2>Add Users</h2><br/>
                    <input
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <br /> 
                    <input
                        email="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <br /> 
                    <input
                        phone_number="phone_number"
                        placeholder="phone number"
                        value={this.state.phone_number}
                        onChange={this.handlePhoneNumberChange}
                    />
                    <br /> 
                    <input
                        Groups="Groups"
                        placeholder="groups"
                        type="number"
                        value={this.state.Groups}
                        onChange={this.handleGroupsChange}
                    />
                    <br /> 
                    <input
                        isActive="isActive"
                        placeholder="isActive"
                        value={this.state.isActive}
                        onChange={this.handleisActiveChange}
                    />
                    <br /> 

                    <menu>
                    <button id="cancelBtn" value="cancel">Cancel </button>
                    <button id="submit" value="default">Submit </button>
                    </menu>

                </form>
            </dialog>
            
            <menu>
                <button id="addUserBtn">Add Users </button>
            </menu>
        </div>
        )
    }
}

export default Form