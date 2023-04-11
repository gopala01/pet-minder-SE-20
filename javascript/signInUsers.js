import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

    const firebaseConfig = {
    apiKey: "AIzaSyBHIHD0PDT5IPyomztjZXjGY3_AdTsIfj0",
    authDomain: "qm-se-20.firebaseapp.com",
    databaseURL: "https://qm-se-20-default-rtdb.firebaseio.com",
    projectId: "qm-se-20",
    storageBucket: "qm-se-20.appspot.com",
    messagingSenderId: "830582484400",
    appId: "1:830582484400:web:c2a7f77ab61f1344f03a75"
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

    function navigateToForgotPassword(){
        window.location.href= "forgotPassword.html";
    }


    function signin(event){
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in

            const user = userCredential.user;
            const userId = user.uid;
            const db = getDatabase();
            const userRef = ref(db, `profile/${userId}`);

            // Retrieve user data
            onValue(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                
                    // Save user data to local storage
                    localStorage.setItem("fullName", userData.fullName);
                    localStorage.setItem("chosenOption", userData.chosenOption);
                    localStorage.setItem("email", userData.email);
                
                    // Navigate to the next page
                    window.location.href = "../postSignIn/postHomePage.html";
                    console.log("Logged in");
                  } else {
                    console.error("User profile data not found in the database.");
                    // Handle the case when user profile data is not found, e.g., show an error message or sign the user out
                  }
                });
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

                console.error("Error Code:", errorCode, "Error Message:", errorMessage, "Full Error Object:", error);
                alert(errorMessage);
            });

        }


    document.getElementById("logininup").addEventListener("click", signin);
    document.getElementById("forgotPasswordUp").addEventListener("click", navigateToForgotPassword);
