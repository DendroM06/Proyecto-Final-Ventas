var referenciaProductos = db.ref("productos");

  function innerHTML(id, result){
      return document.getElementById(id).innerHTML+=result;
  
  }
  function datos(nombre,precio,imagen){
    return`<div class="col-xs-12 col-sm-6 col-md-3" >
          <div class="thumbnail thumbnail-content-phones">
            <img src="${imagen}" alt="prod-icon" class="img-responsive">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <class="text-left precio">
                   $ ${precio}
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                <a class="btn btn-primary agregar-carrito">Agregar</a>             
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