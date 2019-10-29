import {initializeApp} from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const fb = initializeApp(firebaseConfig);

export default fb;//{ database: fb.database };