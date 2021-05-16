import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDSqu_lkor95n04-wSSBRLt_qtL7Zcjhwo",
    authDomain: "airthrough-messenger.firebaseapp.com",
    projectId: "airthrough-messenger",
    storageBucket: "airthrough-messenger.appspot.com",
    messagingSenderId: "647867170264",
    appId: "1:647867170264:web:14d9d33aa713bdb3f486ad"
  };

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  :firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db,auth,provider };
  