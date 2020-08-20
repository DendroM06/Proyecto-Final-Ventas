var formUpdate = document.getElementById("updatePerfil");
var referenciaPUsuarios = db.ref("usuarios/");
firebase.auth().onAuthStateChanged(function (user) {
  inicializarImagenASubir();
  if (user) {
    var uid = user.uid;
    console.log(user);
    console.log(uid);
    referenciaPUsuarios.on("value", function (datos) {
      var dato = datos.val();
      $.each(dato, function (node, value) {
        if (value.uid == uid) {
          $("#imagen").prop("src", value.imagen);
          $("#inputNombre").val(value.nombre);
          $("#inputApellido").val(value.apellido);
          $("#inputTelefono").val(value.telefono);
          $("#inputUID").val(value.uid);
          $("#inputEmail").val(value.email);
          $("#nombreFotoUser").text(value.nombre + " " + value.apellido);
          $("#keyU").text(node);
          $("#adminU").text(value.admin);
          updateDatos();
          //document.getElementById("cont3").innerHTML = "Bienvenido: " + value.nombre + ' ' + value.apellido;
        }
      });
    });
  }
});

function updateDatos() {
  coleccionPUsuarios = db.ref().child("usuarios");
  //console.log(coleccionPUsuarios);
  formUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("codigo");
    let id = $("#keyU").text();
    let uid = $("#inputUID").val();
    let admin = $("#adminU").text();
    let nombre = $("#inputNombre").val();
    let apellido = $("#inputApellido").val();
    let email = $("#inputEmail").val();
    let telefono = $("#inputTelefono").val();
    let imagen = $("#imagen").attr("src");

    let idFirebase = id;
    if (idFirebase == "") {
      idFirebase = coleccionPUsuarios.push().key;
    }
    dato = {
      admin: admin,
      uid: uid,
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      imagen: imagen,
    };
    actualizaciondato = {};
    actualizaciondato[`/${idFirebase}`] = dato;
    coleccionPUsuarios.update(actualizaciondato);
    id = "";
  });
}

function inicializarImagenASubir() {
  $("#imagen").prop("src", "");
  fichero = document.getElementById("fichero");
  fichero.value = "";
  fichero.addEventListener("change", subirImagenAFirebase, false);
}
var nuevaImagen;
function subirImagenAFirebase() {
  var imagenAsubir = fichero.files[0];
  var ImagenProceso = stRef
    .child("usuarios/" + imagenAsubir.name)
    .put(imagenAsubir);
  // Funcion subida
  ImagenProceso.on(
    "state_changed",
    function (snapshot) {
      // Progreso
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Subiendo: " + progress + "% completo");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("La subida a sido pausada");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("La subida se esta ejecutando");
          break;
      }
    },
    function (error) {
      console.log("Ocurrio un error");
      // Handle unsuccessful uploads
    },
    function () {
      ImagenProceso.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("La imagen se completo de subir: ", downloadURL);
        nuevaImagen = downloadURL;
        $("#imagen").prop("src", nuevaImagen);
        nuevaImagen = "";
      });
    }
  );
}

function botonCancelar() {
  location.href = "../editarPerfil.html";
}
