var referenciaProductos = db.ref("productos");

function innerHTML(id, result) {
  return (document.getElementById(id).innerHTML += result);
}
function datos(nombre, precio, imagen, id) {
  //var i = i+1;
  return `<div class="col-xs-12 col-sm-6 col-md-3" >
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
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>             
            </div>
          </div>
          </div> `;
}
function verProducto() {
  var task = db.ref("productos/");
  task.on("child_added", function (data) {
    var taskValue = data.val();
    task.id = data.key;
    var productos = datos(
      taskValue.nombre,
      taskValue.precio,
      taskValue.imagen,
      task.id
    );
    innerHTML("imagen1", productos);
    //console.log(productos);
  });
}
function datosWh(nombre, precio, imagen, id, categoria) {
  if (categoria == "Cerveza")
    return `<div class="col-xs-12 col-sm-6 col-md-3" >
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
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>             
            </div>
          </div>
          </div> `;
}


<<<<<<< HEAD
=======
        //return document.getElementById('cer').style.display='none';
    
   
  }
    
    
}
function verProductoW(){
  var task  = db.ref("productos/");
  task.on("child_added",function(data){
      var taskValue = data.val();
      taskValue.id = data.key;
      taskValue.codigo = 'Whisky';
      var productos = datosW(taskValue.nombre,taskValue.precio,taskValue.imagen,taskValue.id,taskValue.categoria);
      innerHTML("twhisky",productos);
     //console.log(productos);
    
    
>>>>>>> bf8d0b9a5c110ead4d6276b33d6ebfca1996a3b5

