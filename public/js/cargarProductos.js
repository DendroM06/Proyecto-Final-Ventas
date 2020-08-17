var referenciaProductos = db.ref("productos");
/*
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
  }*/
  function innerHTML(id, result){
      return document.getElementById(id).innerHTML+=result;
  
  }
  function datos(nombre,precio,imagen){
    return`<div class="col-xs-12 col-sm-6 col-md-3">
          <div class="thumbnail thumbnail-content-phones">
            <img src="${imagen}" alt="prod-icon" class="img-responsive">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <class="text-left">
                   $ ${precio}
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                <a href="#" class="btn btn-danger" role="button" align="right">Agregar</a>             
            </div>
          </div>
          </div> `;
  }
  function verProducto(){
      var task  = db.ref("productos/");
      task.on("child_added",function(data){
          var taskValue = data.val();
          var productos = datos(taskValue.nombre,taskValue.precio,taskValue.imagen);
          innerHTML("imagen1",productos);

      });
  }