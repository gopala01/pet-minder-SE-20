// import firebase from "https://www.gstatic.com/firebasejs/9.18.0/firebase.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBHIHD0PDT5IPyomztjZXjGY3_AdTsIfj0",
//     authDomain: "qm-se-20.firebaseapp.com",
//     projectId: "qm-se-20",
//     storageBucket: "qm-se-20.appspot.com",
//     messagingSenderId: "830582484400",
//     appId: "1:830582484400:web:c2a7f"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const auth = getAuth()




// document.getElementById('signupinp').addEventListener('click', function (event) {
//     function signup(event){
//         event.preventDefault();
//     }

//     var firstName = document.getElementById('firstName').value
//     var lastName = document.getElementById('lastName').value
//     var email = document.getElementById('email').value
//     var password = document.getElementById('password').value

//     auth.createUserWithEmailAndPassword(email, password)
//         .then(function (user) {
//             var ref = firebase.database().ref("users").child(user.uid)
//             ref.set({
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 uid: user.uid
//             });
//         })
//         .catch(function (error) {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert(errorMessage)
//         });
// });

import firebase from "https://www.gstatic.com/firebasejs/9.18.0/firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHIHD0PDT5IPyomztjZXjGY3_AdTsIfj0",
    authDomain: "qm-se-20.firebaseapp.com",
    projectId: "qm-se-20",
    storageBucket: "qm-se-20.appspot.com",
    messagingSenderId: "830582484400",
    appId: "1:830582484400:web:c2a7f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();

function signup(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set user data in the database
      const ref = firebase.database().ref("users").child(user.uid);
      ref.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: user.uid,
      });

      // Redirect to a success page
      window.location.href = "success.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

document.getElementById("signupinp").addEventListener("click", signup);
