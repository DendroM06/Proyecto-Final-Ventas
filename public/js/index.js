auth.onAuthStateChanged(user => {
    if (user) {
        //console.log('Productos');
        location.href = "../principal.html";        
    }else{     
        //console.log('login');   
        location.href = "../login_registrarse.html";
    }
  });