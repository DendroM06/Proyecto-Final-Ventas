class Carrito{
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto); 
           // console.log(producto);         
        }
    }
   
    
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            nombre : producto.querySelector('h3').textContent,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productoLS;
        
        
        this.insertarCarrito(infoProducto);
        
    }

    insertarCarrito(producto){
        const row = document.createElement('tr');
        const iconoBorrar =
  '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>
            <a class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar" data-id="${producto.id}">${iconoBorrar}</a>
        </td>`;
        
        listaProductos.appendChild(row);   
        this.guardarPedidoLS(producto);  
        this.guardarTemp(producto);         
        console.log(producto.id);
    }

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('btnBorrar')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');            
        }
        this.eliminarProductoLS(productoID);
       
    }

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        return false;
    }

    guardarPedidoLS(producto){
        let productos;
        productos = this.ObtenerProductosLS();
        productos.push(producto);
        localStorage.setItem('productos',JSON.stringify(productos));
    }

    ObtenerProductosLS(){
        var productoLS;
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;        
    }

    eliminarProductoLS(productoID){
        let productosLS;
        productosLS = this.ObtenerProductosLS();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id == productoID){
                productosLS.splice(index,1);
            }
        });
        localStorage.setItem('productos',JSON.stringify(productosLS));
    }

    guardarTemp(productoF){
        var id = document.getElementById(productoF.id);
        var cantidad = document.getElementById(productoF.cantidad);
        console.log(id + cantidad);

    }
    
}

 

 