import React, {Component} from "react";
import './App.css';
import './style/table.css'
import styled from 'styled-components';

class Form extends Component {

    render() {  
        return(
            <dialog id="dialogForm">
                <button onClick={this.props.closeDialog}> x </button>
                <h2>Add Users</h2><br/>
                    <input
                        name="name"
                        placeholder="name"
                        value={this.props.name}
                        onChange={this.props.handleNameChange}
                    />
                    <br /> 
                    <input
                        name="email"
                        placeholder="email"
                        value={this.props.email}
                        onChange={this.props.handleEmailChange}
                    />
                    <br /> 
                    <input
                        name="phone_number"
                        placeholder="phone number"
                        value={this.props.phone_number}
                        onChange={this.props.handlePhoneNumberChange}
                    />
                    <br />                     

                    <input
                        name="Groups"
                        placeholder="groups"
                        type="number"
                        value={this.props.Groups}
                        onChange={this.props.handleGroupsChange}
                    />
                    {/* <label>
                    <input 
                    name="isActive"
                    type="checkbox"
                    defaultChecked={false}
                    checked={!!this.props.isActive}
                    value={this.props.isActive}
                    />
                    User isActive
                    </label> */}
                    <br /> 
                    <menu>
                        <button id="cancel" onClick={this.props.closeDialog}>Cancel </button>
                        <button id="submitBtn" onClick={this.props.onUserAction}>Submit </button>
                    </menu>
            </dialog>
            
        )
    }
}

export default Form