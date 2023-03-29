import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHIHD0PDT5IPyomztjZXjGY3_AdTsIfj0",
  authDomain: "qm-se-20.firebaseapp.com",
  projectId: "qm-se-20",
  storageBucket: "qm-se-20.appspot.com",
  messagingSenderId: "830582484400",
  appId: "1:830582484400:web:c2a7f77ab61f1344f03a75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

var firstName = document.getElementById('firstName')
var lastName = document.getElementById('lastName')
var email = document.getElementById('email')
var password = document.getElementById('password')


window.signup = function(e){
    e.preventDefault();
    var obj = {
        firstName : firstName.value,
        lastName : lastName.value,
        email : email.value,
        password : password.value,
        last_login : Date.now()
    }
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(success){
        alert("Signup success")
    })
    .catch(function(error){
        alert("Error " + error)
    })
    console.log(obj)
}


// function register(){
//     firstName = document.getElementById('firstName').value
//     lastName = document.getElementById('lastName').value
//     email = document.getElementById('email').value

//     auth.createUserWithEmailAndPassword(email, password)
//     .then(function(){
//         var user = auth.currentUser

//         var database_ref = database.ref()

//         var user_data = {
//             firstName : firstName,
//             lastName : lastName,
//             email : email,
//             last_login : Date.now()
//         }

//         database_ref.child('users/' + user.uid).set(user_data)

//         alert('User created!')
//     })
//     .catch(function(error){
//         var error_message = error.message
//         alert(error_message)
//     })


// }