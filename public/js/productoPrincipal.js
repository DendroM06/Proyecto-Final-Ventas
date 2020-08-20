var referenciaProductos = db.ref("productos");

  function innerHTML(id, result){
      return document.getElementById(id).innerHTML+=result;
  
  }
  function datos(nombre,precio,imagen, id){
    //var i = i+1;
    return`<div class="col-xs-12 col-sm-6 col-md-3" style="width:240px heigth:70px">
          <div class="thumbnail thumbnail-content-phones"style="width:240px heigth:70px">
            <img src="${imagen}" alt="prod-icon" class="img-responsive" width="225" height="225">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h4 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h4> 
                <p style="text-align: center;">
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                </p> 
                <p>
                <p style="text-align: center;">
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>  
                </p>
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
 

