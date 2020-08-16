var imagen;
var storageRef;

function inicializar(){
    imagen = document.getElementById("imagen");
    imagen.addEventListener("change", subirImagenFirebase, false);

    storageRef = firebase.storage().ref();
}

function subirImagenFirebase(){
    var imagenAsubir = imagen.files[0];
    //Subir la imagne a firebase
    var uploadTask = storageRef.child('productos/' + imagenAsubir.name).put(imagenAsubir);
}