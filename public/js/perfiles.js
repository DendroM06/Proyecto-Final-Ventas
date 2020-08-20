var referenciaUsuarios = db.ref("usuarios/");
firebase.auth().onAuthStateChanged(function (user) {  
  if (user) {
    var uid = user.uid;
    console.log(user);
    console.log(uid);
    referenciaUsuarios.on("value", function (datas) {
        var data = datas.val();
        $.each(data, function (node, value) {
          if (value.admin == 'true') {
            $("#ssa").css("display", "block");
          }else{
            $("#ssa").css("display", "none");
          }
        });
      });      
  }
});
