//referencia a la base de datos usuarios
var referencia = db.ref("usuarios");

const registroCompletoForm = document.querySelector("#registroCompleto");
//coleccionUsuarios = db.ref().child("usuarios");
//console.log(coleccionUsuarios);

registroCompletoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  guardarDatos();
});

function guardarDatos() {
  var registroNombre = document.querySelector("#RNombre").value;
  var registroApellido = document.querySelector("#RApellido").value;
  var registroTelefono = document.querySelector("#RTelefono").value;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ..
      referencia
        .push({
          email: email,
          nombre: registroNombre,
          apellido: registroApellido,
          imagen: photoURL,
          telefono: registroTelefono,
        })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registrado Correctamente",
            showConfirmButton: false,
            timer: 3000,
            width: 400,
          }).then(function () {
            window.location = "../principal.html";
          });
        })
        .catch((err) => {
          Swal.fire("Error vuelve a itentarlo");
        });
    }
  });
}
