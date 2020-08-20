var referenciaProductos = db.ref("productos");

  function innerHTML(id, result){
      return document.getElementById(id).innerHTML+=result;
  
  }
  function datos(nombre,precio,imagen, id){
    //var i = i+1;
    return`<div class="col-xs-12 col-sm-6 col-md-3" >
          <div class="thumbnail thumbnail-content-phones">
            <img src="${imagen}" alt="prod-icon" class="img-responsive">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h1 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h1>     
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                <p>
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>  
                </p>               
            </div>
          </div>
          </div> `;
  }
  function verProducto(){
      var task  = db.ref("productos/");
      task.on("child_added",function(data){
          var taskValue = data.val();
          var productos = datos(taskValue.nombre,taskValue.precio,taskValue.imagen,data.key);
          innerHTML("imagen1",productos);
        // console.log(h);
      });
     
  }
  function datosWh(nombre,precio,imagen,categoria){
    if(categoria == 'Cerveza')
      return`<div class="col-xs-12 col-sm-6 col-md-3" >
          <div class="thumbnail thumbnail-content-phones">
            <img src="${imagen}" alt="prod-icon" class="img-responsive">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h1 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h1>                        
            </div>
          </div>
          </div> `   
  }
  function verProductoC(){
    var task  = db.ref("productos/");
    task.on("child_added",function(data){
        var taskValue = data.val();        
        var productos = datosWh(taskValue.nombre,taskValue.precio,taskValue.imagen,task.categoria);
        innerHTML("imagen1",productos);
       //console.log(productos);

    });
}


