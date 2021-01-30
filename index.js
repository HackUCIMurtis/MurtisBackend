const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

// routes
const guides = require("./routes/guides");
const search = require("./routes/search");
const createLink = require("./routes/creatLink.js");

// environment file
require("dotenv").config();

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Load credentials from firebase
// const serviceAccount = require('./serviceAccountKey.json');
const { query } = require('express');

// Load Twilio SMS
const accountSid = "";
const authToken = "";
//const client = require('twilio')(accountSid, authToken);

// Create the firebase connection
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);

// Initialize our DB
const db = firebase.firestore();

app.use("./api", guides);
app.use("./api", search);
app.use("./api", createLink);

app.listen(port, () => {
    console.log(`Murtis API listening on port ${port}`);
})