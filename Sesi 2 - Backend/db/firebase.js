const firebase = require("firebase");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const firebaseConfig = {
  apiKey: "AIzaSyCVtTje_BdF19HtXV2HlVKDyIvNfNNUvPY",
  authDomain: "fir-project-capstone.firebaseapp.com",
  projectId: "fir-project-capstone",
  storageBucket: "fir-project-capstone.appspot.com",
  messagingSenderId: "303050753358",
  appId: "1:303050753358:web:b15298602b2c2c86e84a1f",
  measurementId: "G-8E69S7JKYX",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const productRef = db.collection("products");

firebase.initializeApp(firebaseConfig);

module.exports = {
  admin,
  productRef,
  firebase,
  db,
};
