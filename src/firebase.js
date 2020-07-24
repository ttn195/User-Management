import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { reduceHooks } from 'react-table';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAgnsAOCkDaSIPAwcd-dmArWy_i-uVzhMs",
    authDomain: "usermanagement-9ef2c.firebaseapp.com",
    databaseURL: "https://usermanagement-9ef2c.firebaseio.com",
    projectId: "usermanagement-9ef2c",
    storageBucket: "usermanagement-9ef2c.appspot.com",
    messagingSenderId: "1030816510340",
    appId: "1:1030816510340:web:204ffeb34b92e25f142dd1",
    measurementId: "G-X9VB59NVWV"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  
  export const auth = firebase.auth()
  export const db = firebase.firestore()

  export default firebase 