import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import { useTable } from 'react-table';
import './style/table.css';

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

class DeletedTable extends Component {

        render() {
            const columns = [
                {
                id: "",
                Header: "",
                accessor: "icon",
                Cell: () => (
                    <img src = "https://static.thenounproject.com/png/638636-200.png" alt="" width="25" height="25"/>
                )},
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
                accessor: "isActive",
                id: "isActive",
                },
                {
                id: "Groups",
                Header: "Groups",
                accessor: "Groups"
                },
                ]
                }
            ]
            return (
                <div>
                    <Styles>
                        <Table columns={columns} userList={this.props.userList} data={this.props.deletedList} />
                    </Styles>
                </div>
                )
            }
}

export default DeletedTable