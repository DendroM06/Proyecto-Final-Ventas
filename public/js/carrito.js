class Carrito{
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);           
        }
    }
}

leerDatosProducto(producto){
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        nombre : producto.querySelector('h3').textContent,
        precio : producto.querySelector('precio').textContent,
        id : producto.querySelector('a')
    }
}