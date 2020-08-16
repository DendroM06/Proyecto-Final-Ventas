//Conexion a la base de Datos
var firebaseConfig = {
  apiKey: "AIzaSyA-lvzpzhssljG3HhJ4S6Bp-I7N9EfBiGQ",
  authDomain: "proyectofinal-ventas.firebaseapp.com",
  databaseURL: "https://proyectofinal-ventas.firebaseio.com",
  projectId: "proyectofinal-ventas",
  storageBucket: "gs://proyectofinal-ventas.appspot.com",
  messagingSenderId: "539580745174",
  appId: "1:539580745174:web:3460ccd053267a0b1ad077",
  measurementId: "G-QCD8EL0TXZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const fs = firebase.firestore();
const db = firebase.database();
const storage = firebase.storage();


