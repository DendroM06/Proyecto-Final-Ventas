var referenciaProductos = db.ref("productos");

  function mostrarProductoFirebase(){
      referenciaProductos.on("value", function(snapshot){
          var datos = snapshot.val();
          var result ="";
          var nom ="";
          for (var key in datos) {
              console.log( datos[key].imagen);
              result += '<img class="img-responsive" alt="prod-icon" src="' + datos[key].imagen + '"/>';
              //nom ='<h3 class=" text-center">'+ datos[key].nombre + '</h3>';
              
          }
          document.getElementById("all-categories").innerHTML = result;
      

      })
  }