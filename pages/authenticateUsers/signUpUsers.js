import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
    import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
    import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';

    const firebaseConfig = {
    apiKey: "AIzaSyBHIHD0PDT5IPyomztjZXjGY3_AdTsIfj0",
    authDomain: "qm-se-20.firebaseapp.com",
    databaseURL: "https://qm-se-20-default-rtdb.firebaseio.com",
    projectId: "qm-se-20",
    storageBucket: "qm-se-20.appspot.com",
    messagingSenderId: "830582484400",
    appId: "1:830582484400:web:c2a7f77ab61f1344f03a75"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);

    function signup(event) {
    event.preventDefault();
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;

        // Set user data in the database
        set(ref(db, `users/${user.uid}`), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            uid: user.uid,
        });
        window.location.href = 'login.html'
        // Redirect to a success page
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        });
    }

    document.getElementById("signupinp").addEventListener("click", signup);