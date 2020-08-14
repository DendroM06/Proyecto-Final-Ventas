const Lfacebook = document.querySelector('#LFacebook');
Lfacebook.addEventListener('click', e => {
    e.preventDefault();
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(providerFacebook).then((result) => {
        console.log(result);
        console.log("facebook Login");
      })
      .catch(err => {
        console.log(err);
      })
});