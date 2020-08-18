//Formulario de login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector("#LEmail").value;
  const loginPassword = document.querySelector("#LPassword").value;
  var referenciaUsuarios = db.ref("usuarios/");
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      // clear the form
      loginForm.reset();
      //dirigirse a la pagina principal
      firebase.auth().onAuthStateChanged(function (user) {  
        if (user) {
          var uid = user.uid;
          console.log(user);
          console.log(uid);
          referenciaUsuarios.on("value", function (datas) {
              var valor = datas.val();              
              if (valor != null) {
                $.each(valor, function (node, value) {
                    if (value.uid == uid) {
                      location.href = "../principal.html";
                    }else{
                      location.href = "../registroFinal.html";
                    }                  
                });                
              } else {
                location.href = "../registroFinal.html";                
              }
            });      
        }
      });      
      //location.href = "/principal.html"
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