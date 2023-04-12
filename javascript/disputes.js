import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getDatabase, ref, set, get, update } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';


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

export function submitDispute(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var title = document.getElementById("disputeTitle").value;
    var body = document.getElementById("disputeBody").value;
    var currentUser = auth.currentUser; // get current user
    var uid = currentUser.uid; // get current user's uid


    var petInfoRef = ref(db, `disputes/${uid}`);

    get(petInfoRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            update(ref(db, `disputes/${uid}`), {
                disputeEmail: email,
                disputeTitle: title,
                disputeBody: body
            })
            .then(() => {
                console.log("Dispute Recorded");
                window.location.href = "profile.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(errorMessage);
            });
        }
        else {
            set(ref(db, `disputes/${uid}`), {
                disputeEmail: email,
                disputeTitle: title,
                disputeBody: body
            })
            .then(() => {
                console.log("Dispute Recorded");
                window.location.href = "profile.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(errorMessage);
            });
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorMessage);
    });
}


document.getElementById("disputeEntry").addEventListener("submit", submitDispute);