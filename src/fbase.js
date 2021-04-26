import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCV1axMlG-sgrjIX5GeVpokrM68spDYxAU',
    authDomain: 'nwitter-a94fa.firebaseapp.com',
    projectId: 'nwitter-a94fa',
    storageBucket: 'nwitter-a94fa.appspot.com',
    messagingSenderId: '188495778123',
    appId: '1:188495778123:web:246d1bd90d24942baad8ce',
    /* apiKey: process.env.React_App_apiKey,
    authDomain: process.env.React_App_authDomain,
    databaseURL: process.env.React_App_databaseURL,
    projectId: process.env.React_App_projectId,
    storageBucket: process.env.React_App_storageBucket,
    messagingSenderId: process.env.React_App_messagingSenderId,
    appId: process.env.React_App_appId,
    measurementId process.env.React_App_measurementId, */
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
