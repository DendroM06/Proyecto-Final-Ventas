//Formulario de registrar
const registroForm = document.querySelector("#registrar-form");
const noCoincide = document.querySelector("#noCoinciden");

registroForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const registroEmail = document.querySelector("#REmail").value;
  const registroPassword = document.querySelector("#RPassword").value;
  const registroCPassword = document.querySelector("#RCPassword").value;

  if (registroCPassword == registroPassword) {
    noCoincide.style.display = "none";
    auth
      .createUserWithEmailAndPassword(registroEmail, registroPassword)
      .then((userCredential) => {
        verificar();
        registroForm.reset();
        mensajeAlertaCorrecto();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          emailIncorrecto('El correo electrónico no es valido');
        }else{
          emailIncorrecto('El correo electrónico ya esta en uso');
        }
      });
  } else {
    noCoincide.style.display = "block";
  }
});

function verificar() {
  var user = auth.currentUser;
  user
    .sendEmailVerification()
    .then(function () {})
    .catch(function (error) {});
}

function mensajeAlertaCorrecto() {
  Swal.fire({
    title: "Licorera DBCR",
    text: "Verifica tu correo electrónico",
    imageUrl: "/public/assets/img/verificar.jpg",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}

function emailIncorrecto(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
  });
}
