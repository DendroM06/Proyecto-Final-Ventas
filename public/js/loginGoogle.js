const LGoogle = document.querySelector('#LGoogle');
LGoogle.addEventListener('click', e => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(providerGoogle).then((result) => {
        console.log(result);
        console.log('Sesion Iniciada');
    }).catch(err => {
        console.log(err);
    });
});