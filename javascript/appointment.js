import {db} from './connection.js'
import {ref, onValue, query, equalTo, orderByChild} from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';


function refreshMinders() {
    const q = query(ref(db, 'profile'), orderByChild('chosenOption'), equalTo('Minder'))
    onValue(q, (snap) => {
        snap.val().items().map((minder) => {
            console.log(minder)
        })
    })
}

refreshMinders()