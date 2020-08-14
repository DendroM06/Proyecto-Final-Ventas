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
    })
})