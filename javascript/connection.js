import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getDatabase} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyBHIHD0PDT5IPyomztjZXjGY3_AdTsIfj0",
    authDomain: "qm-se-20.firebaseapp.com",
    databaseURL: "https://qm-se-20-default-rtdb.firebaseio.com",
    projectId: "qm-se-20",
    storageBucket: "qm-se-20.appspot.com",
    messagingSenderId: "830582484400",
    appId: "1:830582484400:web:c2a7f77ab61f1344f03a75",
    /*rules: {
        'profile': {
            '.indexOn': ['chosenOption']
        }
    }*/
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)