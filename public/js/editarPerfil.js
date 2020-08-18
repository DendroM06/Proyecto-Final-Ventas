window.onload(cargarDatos());

function cargarDatos() {
    var referenciaUsuarios = db.ref("usuarios/");
firebase.auth().onAuthStateChanged(function (user) {  
  if (user) {
    var uid = user.uid;
    console.log(user);
    console.log(uid);
    referenciaUsuarios.on("value", function (datas) {
        var data = datas.val();
        $.each(data, function (node, value) {
          if (value.uid == uid) {
            $("#imagen").prop("src",  value.imagen);
            $("#inputNombre").val(value.nombre);
            $("#inputApellido").val(value.apellido);
            $("#inputTelefono").val(value.telefono);
            $("#inputUID").val(value.uid);
            $("#inputEmail").val(value.email);
            //document.getElementById("cont3").innerHTML = "Bienvenido: " + value.nombre + ' ' + value.apellido;
          }
        });
      });      
  }
});
}