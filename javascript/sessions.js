import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getDatabase} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        console.log('User is logged in:', user);
        const listItem = document.querySelector("figcaption");
        const newItem = document.createElement('figcaption');
        newItem.innerHTML = 'Welcome ' + user.displayName;
        listItem.parentNode.replaceChild(newItem, listItem);
    } else {
      console.log('User is logged out');
      // User is signed out, handle this case accordingly
    }
  });