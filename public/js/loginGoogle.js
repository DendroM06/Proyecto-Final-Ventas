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
        console.log(err);
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

