import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getDatabase, ref, set, get, update,  query, orderByChild, equalTo } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';


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

export function updatePetInformation(event) {
    event.preventDefault();

    var petName = document.getElementById("pet-name").value;
    var petType = document.getElementById("pet-type").value;
    var petBreed = document.getElementById("pet-breed").value;
    var petAge = document.getElementById("pet-age").value;
    var petDescription = document.getElementById("pet-description").value;
    var currentUser = auth.currentUser; // get current user
    var uid = currentUser.uid; // get current user's uid

    if (petName === "" || petType === "" || petBreed === "" || petAge === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    var petInfoRef = ref(db, `petInformation/${uid}`);

    get(petInfoRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            update(ref(db, `petInformation/${uid}`), {
                petname: petName,
                pettype: petType,
                petbreed: petBreed,
                petage: petAge,
                petdescription: petDescription
            })
            .then(() => {
                console.log("Pet information updated");
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
            set(ref(db, `petInformation/${uid}`), {
                petname: petName,
                pettype: petType,
                petbreed: petBreed,
                petage: petAge,
                petdescription: petDescription
            })
            .then(() => {
                console.log("Pet information set");
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


document.getElementById("petInformation").addEventListener("submit", updatePetInformation);