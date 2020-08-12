import React, {Component} from 'react';
import './App.css';
import UserNavBar from './UserNavBar';
import UserTable from './UserTable';
import  { db } from './firebase'
import * as firebase from 'firebase';
import 'firebase/firestore';

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
        this.HandleisActiveChange = this.HandleisActiveChange.bind(this)
    }

    //Add user to table when Submit button clicked
    addUser(userData) {
        //creates a reference of user collection
        const userRef = db.collection('users').doc()
        console.log('userData', userData)
        let userList = this.state.userList
        //This sets the userData ID to equal the reference ID. Thus, creating a new ID once user is added
        //Allowing us to edit the user with that ID in one action
        userData.id = userRef.id
        userList.push(userData)
        this.setState({userList: userList})
        firebase.firestore().collection('users').doc(userRef.id).set(userData)
        .then(() => console.log("Successfully added user"))
    }   

    //This will trigger the Form to open when Edit is clicked 
    editUser(userData, {idx}) { 
        let userList = this.state.userList
        //Grabs the index of the user 
        let index = userList.findIndex((user) => user.id === idx)
        if (index !== -1) {
            let uid = userList[index].id
            userList[index] = userData
            userList[index].id = uid
            this.setState({userList: userList})
        }
        db.collection("users").doc(idx).update(userData)
        .then(() => console.log("User successfully updated!"))
    }

    //Removes users from table
    removeUser({idx}) {
        //Gets new userList
        let userList = this.state.userList
        //Grabs the ID of each user in the userList
        const uid = this.state.userList[idx].id
        userList.splice(idx, 1)
        //Updates the new changes and sets them
        this.setState({userList: userList})
        db.collection("users").doc(uid).delete()
        .then(() => console.log("Document successfully deleted!"))
        .catch((error) => console.error("Error removing document: ", error))
    }

    //Edits the value of isActive once Toggle Switch is clicked
    HandleisActiveChange({userID}) {
        let userList = this.state.userList
        let index = userList.findIndex((user) => user.id === userID)
        //actual value of checked
        //1. Retrieve the user's isActive field
        let status = userList[index].isActive
        userList[index].isActive = !status
        this.setState({userList: userList})
        //2. Gets the specified user ID 
        //3. Updates boolean value of user ID
        db.collection("users").doc(userID).update({
            "isActive": !status
        })
        .then(() => console.log("isActive bool successfully changed!"))
        .catch((error) => console.error("Error changing isActive bool: ", error))
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
            })
            this.setState({ userList: users})
        })
        .catch( error => console.log(error))
    }

    render() {
        return (
        <div className="container">
                <UserNavBar addUser={this.addUser}  onChange={fields => this.onChange(fields)} />
                <UserTable userList={this.state.userList} removeUser={this.removeUser}
                editUser={this.editUser} addUser={this.addUser} HandleisActiveChange={this.HandleisActiveChange}/>
        </div>
        );
    }
}
export default App;

