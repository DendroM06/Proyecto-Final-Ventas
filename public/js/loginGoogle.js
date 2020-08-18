const LGoogle = document.querySelector('#LGoogle');
LGoogle.addEventListener('click', e => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(providerGoogle).then((result) => {
        var esNuevousuario = result.additionalUserInfo.isNewUser;
        console.log(result);
        if (esNuevousuario) {
        window.location = "../registroFinal.html";            
        } else {
        window.location = "../principal.html";            
        }
    }).catch(err => {
        Swal.fire(
            '¿Error al ingresar al Sistema?',
            'Ya existe un usuario con el mismo correo electrónico',
            'question'
          )
    });
});

const RGoogle = document.querySelector('#RGoogle');
RGoogle.addEventListener('click', e => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(providerGoogle).then((result) => {
        var esNuevousuario = result.additionalUserInfo.isNewUser;
        console.log(result);
        if (esNuevousuario) {
        window.location = "../registroFinal.html";            
        } else {
        window.location = "../principal.html";            
        }
    }).catch(err => {
        console.log(err);
    });
});

