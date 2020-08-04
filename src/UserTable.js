import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import { useTable } from 'react-table'
import Form from './form'
import './style/table.css'

const Styles = styled.div`
padding: 0rem;

table {
width: 100%;
border-collapse: separate;
border-spacing: 0px;
padding: 5px;

}

th, td {
text-align: center;
border: 1px solid black;
padding: 5px;
}

`;

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                </tr>
            )
            })}
        </tbody>
        </table>
    )
}

class UserTable extends Component {
    constructor() {
        super()
        this.state = {
            editUserAction: false,
            name: '',
            email: '',
            phone_number: '',
            isActive: '',
            Groups: '',
        }
        this.showEditUserBox = this.showEditUserBox.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        this.handleGroupsChange = this.handleGroupsChange.bind(this)
        this.handleisActiveChange = this.handleisActiveChange.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.onUserAction = this.onUserAction.bind(this)
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
        console.log("Closing Dialog in UserTable")
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

    showEditUserBox(user) {
        if (this.state.editUserAction){
            console.log("showEditUserBox", user) 
            this.setState({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                Groups: user.Groups,
                isActive: user.isActive
            })
        }
        const dialogForm = document.getElementById("dialogForm")
        dialogForm.showModal()
    }

      //When Submit is clicked, adds user to table
      onUserAction() {
        let user = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            Groups: this.state.Groups,
            isActive: this.state.isActive
        }
        if (this.state.editUserAction) {
            console.log("edit user")
            this.props.editUser()
        } else {
            console.log("add new user")
            this.props.addUser(user)
        }
        this.closeDialog()
    }

    render() {
        const columns = [
            {
                id: "",
                Header: "",
                accessor: "icon",
                Cell: () => (
                    <img src = "https://static.thenounproject.com/png/638636-200.png" alt="" width="25" height="25"/>
                )
            },
            {
            Header: ' ',
            columns: [
            {
            Header: "Name",
            accessor: "name"
            },
            {
            Header: "Email",
            accessor: "email"
            },
            {
            Header: "Phone Number",
            accessor: "phone_number"
            },
            {
            Header: "isActive",
            Cell: ({row}) => {
                return row.original.isActive.toString()
            },
            accessor: "isActive"

            },
            {
            id: "Groups",
            Header: "Groups",
            accessor: "Groups"
            },
            {
            id: "edit",
            Header: "",
            accessor: "edit",
            Cell: ({row}) => (
                <img src="https://www.pinclipart.com/picdir/middle/345-3450678_edit-pencil-outline-in-circular-button-comments-play.png" alt="" width="25" height="25"
                onClick = {() => {
                    let currUser = {
                        name: row.original.name,
                        email: row.original.email,
                        phone_number: row.original.phone_number,
                        isActive: row.original.isActive,
                        Groups: row.original.Groups,
                    }
                    this.setState({
                        editUserAction: true,
                    })
                    this.showEditUserBox(currUser)
                }}
                title="Edit User"
                id="editUserBtn"
                />
            )
            },
            {
            id: "delete",
            Header: "",
            accessor: "delete",
            Cell: ({row}) => (
                <img src="https://cdn3.iconfinder.com/data/icons/ui-essential-elements-buttons/110/DeleteDustbin-512.png" alt="" width="25" height="25"
                onClick={() => {
                    let idx = row.id
                    this.props.removeUser({"idx": idx})
                }}
                title="Delete User"
                id="deleteUserBtn"
                />
            )
            },
            ]
            }
        ]
        return (
            <div className='form-container'>
                <menu>
                    <button id="addUserBtn" onClick={this.showEditUserBox}>Add Users </button>
                </menu>
                <Styles>
                    <Table columns={columns} data={this.props.userList} closeDialog={this.state.closeDialog} />

                    <Form 
                        // editUserInTable={(user) => this.props.editUser(user)} 
                        // onChange={fields => this.onChange(fields)}
                        // addUserToTable={(user) => this.props.addUser(user)}
                        // showEditUserBox={(event) => this.props.editUser(event)}
                        closeDialog={this.closeDialog} 
                        onUserAction={this.onUserAction}
                        
                        name={this.state.name} 
                        email={this.state.email} 
                        isActive={this.state.isActive} 
                        Groups={this.state.Groups} 
                        phone_number={this.state.phone_number}
                        
                        handleNameChange={this.handleNameChange} 
                        handleEmailChange={this.handleEmailChange}
                        handlePhoneNumberChange={this.handlePhoneNumberChange} 
                        handleGroupsChange={this.handleGroupsChange} 
                        handleisActiveChange={this.handleisActiveChange}
                        />
                </Styles>
            </div>
            )
    }
}

export default UserTable