import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import ReactTable, { useRowSelect } from "react-table";  
import makeData from './makeData';
import  { db, auth } from './firebase'
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

    render() {
    const columns = [
        {
        id: "",
        Header: "",
        accessor: "icon",
        Cell: (row) => (
            <img src = "https://static.thenounproject.com/png/638636-200.png" width="25" height="25"/>
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
            onClick = {this.props.getComponent}
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
        <Styles>
        <Table columns={columns} data={this.props.userList} />
        </Styles>
        <div>
            </div>
        </div>
        )
    }
}

export default UserTable