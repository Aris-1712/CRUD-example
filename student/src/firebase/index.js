import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAUZUSSiFUCIDGLbzuiRDtonCWb2RXKg0I",
    authDomain: "student-b65f9.firebaseapp.com",
    databaseURL: "https://student-b65f9.firebaseio.com",
    projectId: "student-b65f9",
    storageBucket: "student-b65f9.appspot.com",
    messagingSenderId: "991662190199",
    appId: "1:991662190199:web:cc3253ce4d28c0f55fe072"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const storage=firebase.storage()
  export default storage