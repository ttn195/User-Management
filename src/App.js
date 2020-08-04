import React, {Component} from 'react';
import './App.css';
import UserNavBar from './UserNavBar';
import UserTable from './UserTable';
import  { db } from './firebase'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //show Form on Edit button
            userList:[],
        }
        this.removeUser = this.removeUser.bind(this)
        this.addUser = this.addUser.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    // adds users to table onSubmit()
    addUser(userData) {
        console.log('[App.js]Adding user')
        console.log(userData)
        let userList = this.state.userList
        userList.push(userData)
        this.setState({userList})
    }   

    // removes users from table
    removeUser({idx}) {
        // gets new userList
        let userList = this.state.userList
        // grabs the ID of each user in the userList
        const uid = this.state.userList[idx].id
        userList.splice(idx, 1)
        //updates the new changes and sets them
        this.setState({userList})
        db.collection("users").doc(uid).delete()
        .then(() => console.log("Document successfully deleted!"))
        .catch((error) => console.error("Error removing document: ", error))
    }
    
    /* This will trigger the Form to open when Edit is clicked */
    editUser() {
        let userList = this.state.userList
        this.setState({userList})
        console.log("edit user")
    }

    onChange = updatedValue => {
        this.setState({
        fields: {
            ...this.state.fields,
            ...updatedValue
        }
        });
    };

    componentDidMount() {
        this.fetchUserList()
    }  

    fetchUserList() {
        db.collection('users').get().then( snapshot => {
            const users = []
            snapshot.forEach(doc => {
                const uid = doc.id
                const data = doc.data()
                data.id = uid
                users.push(data)
                console.log(data)
            })
            this.setState({ userList: users})
        })
        .catch( error => console.log(error))
    }

    render() {

        return (
        <div className="container">
                {/* <UserNavBar addUser={this.addUser} isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false}) } onChange={fields => this.onChange(fields)} /> */}
                <UserNavBar addUser={this.addUser}  onChange={fields => this.onChange(fields)} />
                {/* <Form addUser={this.addUser} onChange={fields => this.onChange(fields)}/> */}
                <UserTable showEditModal={this.showEditModal} userList={this.state.userList} removeUser={this.removeUser}/>

        </div>
        );
    }
}
export default App;

