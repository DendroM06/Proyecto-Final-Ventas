const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
cargarEventos();
function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito.addEventListener('click', (e)=> {compra.eliminarProducto(e)});
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e) {
    e.preventDefault();
    if (compra.ObtenerProductosLS().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona al menos uno',
            timer: 2000,
            showConfirmButton: false
          }).then(function(params) {
              window.location("../product.html");
          })
    }else if(cliente.value === '' || correo.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresar todos los campos requeridos',
            timer: 2000,
            showConfirmButton: false
          }).then(function(params) {
              window.location = "product.html";
          })
    }else{
        
        const cargandoGif = document.querySelector('#cargando');
        cargandoGif.style.display = 'block';
        const enviado = document.createElement('img');
        enviado.src = '../assets/img/mail.gif';
        enviado.style.display = 'block';
        enviado.width = '150';

        setTimeout(()=>{
            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);
            setTimeout(()=>{
                enviado.remove();
                compra.vaciarLocalStorage();
                window.location = "product.html"
            }, 2000)
        }, 3000)
    }
}