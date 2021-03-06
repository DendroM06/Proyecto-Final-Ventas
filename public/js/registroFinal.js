//referencia a la base de datos usuarios
var referencia = db.ref("usuarios/");
var claveAdmin = db.ref("admin/");
// Accedemos a los componentes
const registroCompletoForm = document.querySelector("#registroCompleto");
var perfil = document.getElementById("perfil");
var RClave = document.getElementById("RClave");
RClave.style.display = "none";

perfil.addEventListener("click", function (e) {
  var cargo = perfil.value;
  if (cargo == "Administrador") {
    RClave.disabled = false;
    RClave.style.display = "block";
    RClave.required = true;    
    RClave.value = '';
  } else {
    RClave.disabled = true;
    RClave.style.display = "none";
    RClave.required = false; 
    RClave.value = 0;
  }
});

registroCompletoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  guardarDatos();
});

function guardarDatos() {
  var registroNombre = document.querySelector("#RNombre").value;
  var registroApellido = document.querySelector("#RApellido").value;
  var registroTelefono = document.querySelector("#RTelefono").value;
  var clave = CryptoJS.MD5(RClave.value);
  var admin;
  claveAdmin.on("value", function (datas) {
    var con = datas.val();
    $.each(con, function (node, value) {
      var claveBase = value.claveAdmin;
      console.log(claveBase);
      if (clave == claveBase) {
        admin = true;
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
            if (photoURL == null) {
              photoURL = 'https://firebasestorage.googleapis.com/v0/b/proyectofinal-ventas.appspot.com/o/usuarios%2Fusuario.jpg?alt=media&token=04e10d53-980d-47d2-91d7-2b5dce2621cf';
            }
            referencia
              .push({
                email: email,
                nombre: registroNombre,
                apellido: registroApellido,
                imagen: photoURL,
                telefono: registroTelefono,
                uid: uid,
                admin: admin,
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
                  console.log(admin);
                  location.href = "../principal.html"; 
                });
              })
              .catch((err) => {
                Swal.fire("Error vuelve a itentarlo");
              });
          }
        });
      }else if(RClave.value == '0' || RClave.value == ''){
        admin = false;
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
            if (photoURL == null) {
              photoURL = 'https://firebasestorage.googleapis.com/v0/b/proyectofinal-ventas.appspot.com/o/usuarios%2Fusuario.jpg?alt=media&token=04e10d53-980d-47d2-91d7-2b5dce2621cf';
            }
            referencia
              .push({
                email: email,
                nombre: registroNombre,
                apellido: registroApellido,
                imagen: photoURL,
                telefono: registroTelefono,
                uid: uid,
                admin: admin,
              })
              .then(() => {
                console.log(admin);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registrado Correctamente",
                  showConfirmButton: false,
                  timer: 3000,
                  width: 400,
                }).then(function () {
                  location.href = "../principal.html"; 
                });
              })
              .catch((err) => {
                Swal.fire("Error vuelve a itentarlo");
              });
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Codigo Incorecto...',
          text: 'El código de Administrador es incorrecto.'
        })
      }
    });
  });
}
