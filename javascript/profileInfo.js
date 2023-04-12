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

auth.onAuthStateChanged(user => {
    if (user) {
      displayPetInformation(user.uid);
    }
});

function displayPetInformation() {

    var currentUser = auth.currentUser; // get current user
    if (currentUser) {
        var uid = currentUser.uid; // get current user's uid
        var petInfoRef = ref(db, `petInformation/${uid}`);
        get(petInfoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var petInfo = snapshot.val();
                    var petNameElement = document.getElementById('pet-name');
                    petNameElement.textContent = petInfo.petname;
                    var petTypeElement = document.getElementById('pet-type');
                    petTypeElement.textContent = petInfo.pettype;
                    var petBreedElement = document.getElementById('pet-breed');
                    petBreedElement.textContent = petInfo.petbreed;
                    var petAgeElement = document.getElementById('pet-age');
                    petAgeElement.textContent = petInfo.petage;
                    var petDescriptionElement = document.getElementById('pet-description');
                    petDescriptionElement.textContent = petInfo.petdescription;
                } else {
                    console.log('No pet information found for user.');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.log('No user is currently signed in.');
    }
}
  
