var referenciaProductos = db.ref("productos");

function vertodosProductos(){
  verProducto();
  verProductoW();
  verProductoC();
  verProductoR();
}

function innerHTML(id, result) {
  return (document.getElementById(id).innerHTML += result);
}
function datos(nombre, precio, imagen, id) {
  //var i = i+1;
  return `<div class="col-xs-12 col-sm-6 col-md-3" style="width:240px heigth:70px">
          <div class="thumbnail thumbnail-content-phones" style="width:240px heigth:70px">
            <img src="${imagen}" alt="prod-icon" class="img-responsive" width="225" height="225" >
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h4 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h4>   
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
function datosW(nombre, precio, imagen, id, categoria) {
  if (categoria == 'Whisky'){
    return `<div class="col-xs-12 col-sm-6 col-md-3" style="width:240px heigth:70px">
          <div class="thumbnail thumbnail-content-phones" style="width:240px heigth:70px">
            <img src="${imagen}" alt="prod-icon" class="img-responsive" width="225" height="225">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h4 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h1>   
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>             
            </div>
          </div>
          </div> `;

  }else if(categoria == 'Cerveza'){
    return`<a><a>`;
       
  }
  else{
    return`<a><a>`;
         
  }
    
}

function verProductoW(){
  var task  = db.ref("productos/");
  task.on("child_added",function(data){
      var taskValue = data.val();
      taskValue.id = data.key;
      
      var productos = datosW(taskValue.nombre,taskValue.precio,taskValue.imagen,taskValue.id,taskValue.categoria);
      innerHTML("twhisky",productos);
     //console.log(productos);
  });
}

function datosC(nombre, precio, imagen, id, categoria) {
  if (categoria == 'Cerveza'){
    return `<div class="col-xs-12 col-sm-6 col-md-3" style="width:240px heigth:70px">
          <div class="thumbnail thumbnail-content-phones" style="width:240px heigth:70px">
            <img src="${imagen}" alt="prod-icon" class="img-responsive" width="225" height="225">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h4 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h1>   
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>             
            </div>
          </div>
          </div> `;

  }else if(categoria == 'Cerveza'){
    return`<a><a>`;
       
  }
  else {
    return`<a><a>`;
         
  }

    
}

function verProductoC(){
  var task  = db.ref("productos/");
  task.on("child_added",function(data){
      var taskValue = data.val();
      taskValue.id = data.key;
      
      var productos = datosC(taskValue.nombre,taskValue.precio,taskValue.imagen,taskValue.id,taskValue.categoria);
      innerHTML("tcerveza",productos);
     //console.log(productos);
  });
}

function datosR(nombre, precio, imagen, id, categoria) {
  if (categoria == 'Ron' || categoria == 'Vodka'){
    return `<div class="col-xs-12 col-sm-6 col-md-3" style="width:240px heigth:70px">
          <div class="thumbnail thumbnail-content-phones" style="width:240px heigth:70px">
            <img src="${imagen}" alt="prod-icon" class="img-responsive" width="225" height="225">
             <div class="caption">
                <h3 class=" text-center">${nombre}</h3>	                								        
                <h4 class="card-title pricing-card-title text-center precio" text-align="center">
                   $ 
                   <span class="">${precio}
                   </span>
                </h1>   
                <input id="cantidad" type="number"  min="1" max="100" value="1" required />
                <a class="btn btn-primary agregar-carrito" data-id="${id}">Agregar</a>             
            </div>
          </div>
          </div> `;

  }else if(categoria == 'Cerveza'){
    return`<a><a>`;
       
  }
  else {
    return`<a><a>`;
         
  }

    
}

function verProductoR(){
  var task  = db.ref("productos/");
  task.on("child_added",function(data){
      var taskValue = data.val();
      taskValue.id = data.key;
      
      var productos = datosR(taskValue.nombre,taskValue.precio,taskValue.imagen,taskValue.id,taskValue.categoria);
      innerHTML("tron",productos);
     //console.log(productos);
  });
}