import React, {Component} from "react";
import './App.css';
import './style/table.css'
import styled from 'styled-components';

const Container = styled.label`
    position: relative;
    display: inline-block;
    width: 30px;
    height: 16px;
    
    > input {
        display: none
    }

`;
const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ddd;
    transition: 0.4s;
    border-radius: 15px;

    &:before {
        position: absolute;
        content: '';
        height: 15px;
        width: 15px;
        background-color: #999;
        transition: 0.2s;
        border-radius: 50%
    }
`;
const SliderInput = styled.input`
&:checked + ${Slider} {
    background-color: #0365b2;
    &:before {
        transform: translateX(1px);
        background-color: white;
    }
}
`;

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
                    <br />
                    <input
                        name="isActive"
                        placeholder="isActive"
                        value={this.props.isActive}
                        onChange={this.props.handleisActiveChange}
                    
                    />
                    {/* <h5>Is Active</h5>
                       <Container> 
                        <SliderInput 
                            type="checkbox" 
                            onChange={this.props.handleToggleChange}
                            checked={this.props.checked}
                            name="isActive"
                            value={this.props.isActive}
                        />
                        <Slider>
                        </Slider>
                 </Container> */}
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