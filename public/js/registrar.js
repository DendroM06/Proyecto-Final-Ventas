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
        console.log("registrado");
        console.log(userCredential);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
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
