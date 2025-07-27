
//Load the environment variables in the .env file into process.env
require("dotenv").config();

//imports the entire Firebase library
const firebase = require("firebase"); 


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

//Initialize Firebase App
firebase.initializeApp(firebaseConfig);

//Get Realtime Database instance 
const db = firebase.database();

module.exports = db;


