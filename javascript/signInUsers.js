import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
    import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

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


    function signin(event){
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Signed in 
            
            console.log("Logged in")
            window.location.href = "../homepage.html";

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    }

    document.getElementById("logininup").addEventListener("click", signin);
