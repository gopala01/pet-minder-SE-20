import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js';
import { getDatabase, ref, set, get, query, orderByChild, equalTo } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';


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

async function getUserIdByEmail(targetEmail) { //Nader Added
    const usersRef = ref(db, 'users');
    const userQuery = query(usersRef, orderByChild('email'), equalTo(targetEmail));
    const snapshot = await get(userQuery);
  
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userId = Object.keys(userData)[0];
      return userId;
    } else {
      throw new Error('User not found');
    }
  }

  async function requestPhoneNumber(userId) { //Nader Added
    const userRef = ref(db, `users/${userId}`);
    await set(userRef.child("phoneNumberVisibility"), true);
  }
  
  async function getPhoneNumber(userId) {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
  
    const userData = snapshot.val();
    if (userData.phoneNumberVisibility) {
      return userData.phoneNumber;
    } else {
      throw new Error("Phone number not visible");
    }
  }


  document.getElementById("requestNumberButton").addEventListener("click", async () => {
    const targetEmail = document.getElementById("targetEmail").value;
    try {
      const targetUserId = await getUserIdByEmail(targetEmail);
      await requestPhoneNumber(targetUserId);
      alert('Phone number requested');
    } catch (error) {
      alert(error.message);
    }
  });
  
  document.getElementById("getNumberButton").addEventListener("click", async () => {
    const targetEmail = document.getElementById("targetEmail").value;
    try {
      const targetUserId = await getUserIdByEmail(targetEmail);
      const phoneNumber = await getPhoneNumber(targetUserId);
      alert(`Phone number: ${phoneNumber}`);
    } catch (error) {
      alert(error.message);
    }
  });phoneNumberVisibility