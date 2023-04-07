console.log("JavaScript file loaded");
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

async function getUserIdByEmail(targetEmail) {
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


async function requestPhoneNumber(userId) {
  const userRef = ref(db, `users/${userId}`);
  await set(ref(db, `users/${userId}/phoneNumberVisibility`), true);
}

  
async function getPhoneNumber(userId) {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  console.log("User data:", userData);

  const userData = snapshot.val();
  if (userData.phoneNumberVisibility) {
    return userData.phoneNumber;
  } else {
    throw new Error("Phone number not visible");
  }
}



function signup(event) {
event.preventDefault();
var firstName = document.getElementById("firstName").value;
var lastName = document.getElementById("lastName").value;
var o = document.getElementById("option");
var chosenOption = o.options[o.selectedIndex].text;
var email = document.getElementById("email").value;
var phoneNumber = document.getElementById("phoneNumber").value;
var password = document.getElementById("password").value;
var regName = /^[A-Z][a-z]*$/;
var regPhone = /^(?:(?:\+|00)44\s?[1-9]{1}\d{1,4}\s?\d{1,6}|0\d{2,4}\s?\d{1,6})$/;
var regPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{6,}$/;

var errorMessages = [];
if (!regName.test(firstName)) {
    errorMessages.push("Invalid first name given.");
}
if (!regName.test(lastName)) {
    errorMessages.push("Invalid last name given.");
}
if(!regPhone.test(phoneNumber)){
    errorMessages.push("Invalid UK phone number given.");
}

if (!regPass.test(password)) {
    errorMessages.push("Invalid password. The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and have a minimum length of 6 characters.");
}

if(errorMessages.length > 0){
    alert(errorMessages.join("\n"));
    return false;
}
else{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;

    // Set user data in the database
    set(ref(db, `users/${user.uid}`), {
        firstName: firstName,
        lastName: lastName,
        phoneNumber : phoneNumber,
        chosenOption : chosenOption,
        email: email,
        uid: user.uid,
        phoneNumberVisibility: false, // Nader 
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

}

//Nader Added

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
});

//We have to make sure the HTML file contains the necessary elements, such as an input field with the ID targetEmail, a button with the ID requestNumberButton, and another button with the ID getNumberButton.