const Lfacebook = document.querySelector('#LFacebook');
Lfacebook.addEventListener('click', e => {
    e.preventDefault();
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(providerFacebook).then((result) => {
        console.log(result);
        var esNuevousuario = result.additionalUserInfo.isNewUser;
        console.log(result);
        if (esNuevousuario) {
        window.location = "../registroFinal.html";            
        } else {
        window.location = "../principal.html";            
        }   
      })
      .catch(err => {
        console.log(err);
      })
});

const Rfacebook = document.querySelector('#RFacebook');
Rfacebook.addEventListener('click', e => {
    e.preventDefault();
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(providerFacebook).then((result) => {
        console.log(result);
        var esNuevousuario = result.additionalUserInfo.isNewUser;
        console.log(result);
        if (esNuevousuario) {
        window.location = "../registroFinal.html";            
        } else {
        window.location = "../principal.html";            
        }   
      })
      .catch(err => {
        Swal.fire(
          '¿Error al ingresar al Sistema?',
          'Ya existe un usuario con el mismo correo electrónico',
          'question'
        )
      })
});


