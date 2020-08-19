var id_cliente = '-MEwmkudxZnaCJM2MLFu';

var reference = db.ref('pedidosRG/');
reference.on('value', function (datos) {
    var data = datos.val();
    $.each(data, function (id_pedido, value) {
        if (value.id_cliente == id_cliente) {
            var sendData = table(id_pedido, value.total, value.fecha_pedido, value.fecha_entrega, value.estado);
            printHTML('loadTable', sendData);
            var reference2 = db.ref('clientesRG/' + id_cliente);
            reference2.on('value', function (datos2) {
                var data2 = datos2.val();
                document.getElementById('nombreCliente').innerText = data2.nombres + ' ' + data2.apellidos;
            });
        }
    });
});

function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}

function table(id_pedido, total, fecha_pedido, fecha_entrega, estado) {
    if (estado == "Pendiente") {
        return '<tr><td>' + id_pedido +
            '<td><a href="#" data-toggle="modal" data-target="#modalTask" onclick="viewDataPedido(\'' + id_pedido + '\',\'' + estado + '\')">' +
            '<i class="fas fa-clipboard-list text-success icon-lg"></i></a></td>' +
            '</td><td>' + total + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + estado + '</td>' +
            '<td><a href="#" data-toggle="modal" data-target="#modalDelete" onclick="idEliminarPedido(\'' + id_pedido + '\')">' +
            '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
    } else {
        return '<tr><td>' + id_pedido +
            '<td><a href="#" data-toggle="modal" data-target="#modalTask" onclick="viewDataPedido(\'' + id_pedido + '\',\'' + estado + '\')">' +
            '<i class="fas fa-clipboard-list text-success icon-lg"></i></a></td>' +
            '</td><td>' + total + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + estado + '</td><td></td></tr>';
    }
}

var id_confirmarPedido;
function viewDataPedido(id_pedido, estado) {
    inHTML("loadTable2", "");
    var reference = db.ref('detalle_pedidosRG/');
    reference.on('value', function (datos) {
        var data = datos.val();
        var _subtotal = 0;
        $.each(data, function (id_detallePedido, value) {
            if (value.id_pedido == id_pedido) {
                var reference2 = db.ref('productosRG/' + value.id_producto);
                reference2.on('value', function (datos2) {
                    var data2 = datos2.val();
                    _subtotal += value.subtotal;
                    document.getElementById('labelSubtotal').innerText = _subtotal.toFixed(2);
                    document.getElementById('labelIva').innerText = (_subtotal * 0.12).toFixed(2);
                    document.getElementById('labelTotal').innerText = (_subtotal + (_subtotal * 0.12)).toFixed(2);
                    var sendData = table2(data2.producto, data2.costo, value.cantidad, value.subtotal);
                    printHTML('loadTable2', sendData);
                });
            }
        });
    });
    id_confirmarPedido = id_pedido;
    switch (estado) {
        case "Pendiente":
            display('buttonEntregado', 'none');
            display('buttonEditar', '');
            display('buttonConfirmar', '');
            display('buttonEliminar', '');
            break;
        case "Confirmado":
            display('buttonEntregado', '');
            display('buttonEditar', 'none');
            display('buttonConfirmar', 'none');
            display('buttonEliminar', 'none');
            break;
        case "Entregado":
            display('buttonEntregado', 'none');
            display('buttonEditar', 'none');
            display('buttonConfirmar', 'none');
            display('buttonEliminar', 'none');
            break;
    }
}

function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}

function display(request, response) {
    return document.getElementById(request).style.display = response;
}

function table2(producto, costo, cantidad, subtotal) {
    return '<tr><td>' + producto + '</td><td>' + costo + '</td><td>' + cantidad + '</td><td>' + subtotal + '</td></tr>';
}

function confirmarPedido() {
    inHTML("loadTable", "");
    db.ref('pedidosRG/' + id_confirmarPedido).update({
        estado: "Confirmado"
    });
    $("#modalTask").modal("hide");
}

function confirmarEntrega() {
    inHTML("loadTable", "");
    db.ref('pedidosRG/' + id_confirmarPedido).update({
        estado: "Entregado",
        fecha_entrega: dateActuality()
    });
    $("#modalTask").modal("hide");
}

function dateActuality() {
    var fh = new Date();
    return fh.getFullYear() + "-" + (fh.getMonth() + 1) + "-" + fh.getDate() + " " + fh.getHours() + ":" + fh.getMinutes();
}

var id_eliminarPedido;
function idEliminarPedido(id_pedido) {
    id_eliminarPedido = id_pedido;
}

function eliminarPedido1() {
    inHTML("loadTable", "");
    db.ref('pedidosRG/' + id_eliminarPedido).remove();
    $("#modalDelete").modal("hide");
}

function eliminarPedido2() {
    inHTML("loadTable", "");
    db.ref('pedidosRG/' + id_confirmarPedido).remove();
    $("#modalTask").modal("hide");
}