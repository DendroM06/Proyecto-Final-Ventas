//Formulario de login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector("#LEmail").value;
  const loginPassword = document.querySelector("#LPassword").value;

  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      // clear the form
      loginForm.reset();
      //dirigirse a la pagina principal
      console.log("logueado");
      location.href = "/principal.html"
    }).catch((err) => {
      console.log(err.code);
      if (err.code == 'auth/invalid-email' || err.code == 'auth/wrong-password') {        
      Swal.fire(
        '¿Error al ingresar al Sistema?',
        'Verifica tu correo y contraseña',
        'question'
      )
      }else{        
      Swal.fire(
        '¿Error al ingresar al Sistema?',
        'Si no tienes una cuenta porfavor registrate',
        'question'
      )
      }
    })
})