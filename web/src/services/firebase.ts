import { initializeApp } from 'firebase/app'



const firebaseConfig = {
    apiKey: "AIzaSyA4I1LyFQ6INQSNjYzykMQ9D30PQdIT3XA",
    authDomain: "nlw-feedback-widget.firebaseapp.com",
    projectId: "nlw-feedback-widget",
    storageBucket: "nlw-feedback-widget.appspot.com",
    messagingSenderId: "740875825939",
    appId: "1:740875825939:web:e7e9b6c8b8243731d360e6",
    measurementId: "G-YM9NH0Q349"
};

// Initialize Firebase

function initializeFirebase() {
    return initializeApp(firebaseConfig);
}

export { initializeFirebase }
