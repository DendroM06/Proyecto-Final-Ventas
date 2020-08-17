//var db = firebase.database();

////////////////////////////////////////////////////////////////////////////////////////////////
//Clientes
/*
clientes("nombresCliente1","apellidosCliente1", "fecha_nacimientoCliente1","celularCliente1","direccionCliente1","emailCliente1");
clientes("nombresCliente2","apellidosCliente2", "fecha_nacimientoCliente2","celularCliente2","direccionCliente2","emailCliente2");
clientes("nombresCliente3","apellidosCliente3", "fecha_nacimientoCliente3","celularCliente3","direccionCliente3","emailCliente3");
clientes("nombresCliente4","apellidosCliente4", "fecha_nacimientoCliente4","celularCliente4","direccionCliente4","emailCliente4");
clientes("nombresCliente5","apellidosCliente5", "fecha_nacimientoCliente5","celularCliente5","direccionCliente5","emailCliente5");

function clientes(nombres, apellidos, fecha_nacimiento,telefono,direccion, email) {
    db.ref('clientesRG/').push({
        nombres: nombres,
        apellidos: apellidos,
        fecha_nacimiento: fecha_nacimiento,
        telefono: telefono,
        direccion: direccion,
        email: email
    });
}*/
//

////////////////////////////////////////////////////////////////////////////////////////////////
//Productos
/*
productos("Pilsener",1.75, "https://imagen1",12);
productos("Club",2.10, "https://imagen1",6);
productos("Corona",2, "https://imagen1",6);
productos("Budweiser",2.25, "https://imagen1",10);
productos("Biela",1.15, "https://imagen1",4);

function productos(producto, costo, imagen,stock) {
    db.ref('productosRG/').push({
        producto: producto,
        costo: costo,
        imagen: imagen,
        stock: stock
    });
}*/
//

////////////////////////////////////////////////////////////////////////////////////////////////
//Pedidos
/*
pedidos("-MEwmkudxZnaCJM2MLFu",30, "Pendiente");
pedidos("-MEwmkudxZnaCJM2MLFu",25, "Pendiente");
pedidos("-MEwmkuhlKAlGOg8LQ1l",40, "Pendiente");
pedidos("-MEwmkui5L0Bt5CchaUU",50, "Pendiente");
pedidos("-MEwmkui5L0Bt5CchaUV",60, "Pendiente");
pedidos("-MEwmkui5L0Bt5CchaUW",70, "Pendiente");

function pedidos(id_cliente, total, estado) {
    db.ref('pedidosRG/').push({
        id_cliente: id_cliente,
        fecha_pedido: dateActuality(),
        fecha_entrega: '',
        total: total,
        estado: estado
    });
}*/
//

////////////////////////////////////////////////////////////////////////////////////////////////
//Detalle_Pedidos
/*
detalle_pedidos("-MExPXStb7j2KEcbU6Sk","-MExZUuJTxyIzLueo3R_", 2, 10);
detalle_pedidos("-MExPXStb7j2KEcbU6Sk","-MExZUuLrGPTXaxecAGR", 2, 20);
detalle_pedidos("-MExPXSxHJZdwv7Mn85i","-MExZUuMfTgAlfG06KnZ", 3, 20);
detalle_pedidos("-MExPXSxHJZdwv7Mn85i","-MExZUuMfTgAlfG06Kn_", 1, 10);
detalle_pedidos("-MExPXSxHJZdwv7Mn85i","-MExZUuN2RG4K4jnsbac", 3, 10);
detalle_pedidos("-MExPXSypCnCN6eof0CF","-MExZUuJTxyIzLueo3R_", 5, 40);

function detalle_pedidos(id_pedido, id_producto, cantidad, subtotal) {
    db.ref('detalle_pedidosRG/').push({
        id_pedido: id_pedido,
        id_producto: id_producto,
        cantidad: cantidad,
        subtotal: subtotal
    });
}*/
//

////////////////////////////////////////////////////////////////////////////////////////////////
var update = document.getElementById('update');
update.disabled = true;

var reference = db.ref('pedidosRG/');
reference.on('value', function (datos) {
    var data = datos.val();
    $.each(data, function (id_pedido, value) {
        var sendData = table(id_pedido, value.id_cliente, value.fecha_pedido, value.fecha_entrega, value.pedido, value.total, value.estado);
        printHTML('loadTable', sendData);
    });
});

function table(id_pedido, id_cliente, fecha_pedido, fecha_entrega, pedido, total, estado) {
    return '<tr><td>' + id_pedido + '</td><td>' + id_cliente + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + pedido + '</td><td>' + total + '</td><td>' + estado + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + id_pedido + '\',\'' + id_cliente + '\',\'' + pedido + '\',\'' + total + '\',\'' + estado + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeTask(\'' + id_pedido + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}

function value(request) {
    return document.getElementById(request).value;
}
function asignation(request, response) {
    return document.getElementById(request).value = response;
}
function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}
function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}
function dateActuality() {
    var fh = new Date();
    return fh.getFullYear() + "-" + (fh.getMonth() + 1) + "-" + fh.getDate() + " " + fh.getHours() + ":" + fh.getMinutes();
}

function onClickInsert() {
    var id_cliente = value("id_cliente");
    var pedido = value("pedido");
    var total = value("total");
    var estado = value("estado");
    if (id_cliente.length == 0 || pedido.length == 0 || total.length == 0 || estado.length == 0) {
        alert("Por favor, complete todos los campos");
    } else {
        inHTML("loadTable", "");
        insertPedido(id_cliente, pedido, total, estado);
        asignation("id_cliente", "");
        asignation("pedido", "");
        asignation("total", "");
        asignation("estado", "");
        alert("Pedido Guardado con Éxito");
    }
}

function insertPedido(id_cliente, pedido, total, estado) {
    db.ref('pedidosRG/').push({
        id_cliente: id_cliente,
        fecha_pedido: dateActuality(),
        fecha_entrega: '',
        pedido: pedido,
        total: total,
        estado: estado
    });
}



function onClickUpdate() {
    var id_pedido = value("id_pedido");
    var id_cliente = value("id_clienteEdit");
    var pedido = value("pedidoEdit");
    var total = value("totalEdit");
    var estado = value("estadoEdit");
    if (id_cliente.length == 0 || pedido.length == 0 || total.length == 0 || estado.length == 0) {
        alert("Por favor, complete todos los campos");
    } else {
        inHTML("loadTable", "");
        updateTask(id_pedido, id_cliente, pedido, total, estado);
        inHTML("editData", "");
        alert("Actualización Correcta");
        update.disabled = true;
    }
}

function updateTask(id_pedido, id_cliente, pedido, total, estado) {
    db.ref('pedidosRG/' + id_pedido).update({
        id_cliente: id_cliente,
        fecha_pedido: dateActuality(),
        fecha_entrega: '',
        pedido: pedido,
        total: total,
        estado: estado
    });
}

function removeTask(id_pedido) {
    if (confirm("¿Esta seguro/a que desea eliminar este pedido?")) {
        inHTML("loadTable", "");
        db.ref('pedidosRG/' + id_pedido).remove();
    }
}

function viewDataUpdate(id_pedido, id_cliente, pedido, total, estado) {
    var response = '<div class="form-group">' +
        '<input type="hidden" value=' + id_pedido + ' id="id_pedido">' +
        '<label>Id Cliente:</label>' +
        '<input type="text" id="id_clienteEdit" class="form-control" placeholder="Id Cliente" value=' + id_cliente + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Pedido:</label>' +
        '<textarea placeholder="Pedido" class="form-control" id="pedidoEdit">' + pedido + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Total:</label>' +
        '<input type="text" id="totalEdit" class="form-control" placeholder="Total" value=' + total + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Estado:</label>' +
        '<input type="text" id="estadoEdit" class="form-control" placeholder="Estado" value=' + estado + '>' +
        '</div>';
    inHTML('editData', response);
    update.disabled = false;
}