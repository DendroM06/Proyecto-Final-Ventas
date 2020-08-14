  //Boton cerrar Sesion
  const logout = document.querySelector('#cerrarSesion');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('A salido del Sistema')
        location.href = "../login_registrarse.html";
    })
})