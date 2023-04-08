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


  function signup(event) {
  event.preventDefault();

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var o = document.getElementById("option");
  var chosenOption = o.options[o.selectedIndex].text;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var password = document.getElementById("password").value;

  // Call the validateInputs function
  const validationResult = validateInputs(firstName, lastName, phoneNumber, password);
  const { pass, errorMessages } = validationResult;

  // Show error messages if validation fails
  if (!pass) {
    alert(errorMessages.join("\n"));
  } else {
    // If validation passes, proceed with creating the user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created")

        console.log('firstName:', firstName);
        console.log('lastName:', lastName);
        console.log('phoneNumber:', phoneNumber);
        console.log('chosenOption:', chosenOption);
        console.log('email:', email);
        console.log('uid:', user.uid);
        console.log('phoneNumberVisibility:', false);


        // Set user data in the database
        set(ref(db, `users/${user.uid}`), {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          chosenOption: chosenOption,
          email: email,
          uid: user.uid,
          phoneNumberVisibility: false,
        })
        .then(() => {
          console.log("Database details set");
          window.location.href = "login.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(errorMessage)
        });
        
        // Redirect to a success page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
}

function validateInputs(firstName, lastName, phoneNumber, password) {
  var regName = /^[A-Z][a-z]*$/;
  var regPhone = /^(?:(?:\+|00)44\s?[1-9]{1}\d{1,4}\s?\d{1,6}|0\d{2,4}\s?\d{1,6})$/;
  var regPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{6,}$/;

  var errorMessages = [];
  var pass = true;

  if (!regName.test(firstName)) {
    errorMessages.push("Invalid first name given.");
    pass = false;
  }
  if (!regName.test(lastName)) {
    errorMessages.push("Invalid last name given.");
    pass = false;
  }
  if (!regPhone.test(phoneNumber)) {
    errorMessages.push("Invalid UK phone number given.");
    pass = false;
  }
  if (!regPass.test(password)) {
    errorMessages.push("Invalid password. The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and have a minimum length of 6 characters.");
    pass = false;
  }

  return { pass, errorMessages };
}
document.querySelector("form").addEventListener("submit", signup);