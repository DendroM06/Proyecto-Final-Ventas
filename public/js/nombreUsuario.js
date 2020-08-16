var referencia = db.ref("usuarios");
//var userId = firebase.auth().currentUser.uid;

document.getElementById('cont3').innerHTML='Bienvenido: '+'Dennis Muñoz';
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
});