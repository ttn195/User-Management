import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserNavBar from './UserNavBar';
import UserTable from './UserTable';
import DeletedTable from './DeletedTable';

ReactDOM.render(<App />, document.getElementById('root'))
