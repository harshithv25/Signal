import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmEiegfT1u9rcVJGY4MeObxnXAygnZeZ0",
  authDomain: "search-engine-55.firebaseapp.com",
  databaseURL: "https://search-engine-55.firebaseio.com",
  projectId: "search-engine-55",
  storageBucket: "search-engine-55.appspot.com",
  messagingSenderId: "552670257015",
  appId: "1:552670257015:web:f302d09cb5d95a67f78b72",
  measurementId: "G-ELP82TT1QC",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { auth };
export default db;

// {
//     "hosting": {
//       "site": "signal-404",
//       "public": "public",
//       ...
//     }
//   }

// firebase deploy --only hosting:signal-404
