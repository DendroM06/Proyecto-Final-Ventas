const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


cargarEventos();

function cargarEventos(){
    productos.addEventListener('click',(e) => {carro.comprarProducto(e)});
    carrito.addEventListener('click',(e) => {carro.eliminarProducto(e)});
    vaciarCarritoBtn.addEventListener('click', (e) => {carro.vaciarCarrito(e)});
    var x= 24;
    x=16;
    console.log(x);
}