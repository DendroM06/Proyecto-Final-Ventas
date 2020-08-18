var reference = db.ref('pedidosRG/');
reference.on('value', function (datos) {
    var data = datos.val();
    $.each(data, function (id_pedido, value) {
        var reference2 = db.ref('clientesRG/' + value.id_cliente);
        reference2.on('value', function (datos2) {
            var data2 = datos2.val();
            var sendData = table(id_pedido, data2.nombres, data2.apellidos, value.total, value.fecha_pedido, value.fecha_entrega, value.estado);
            printHTML('loadTable', sendData);
        });
    });
});

function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}

function table(id_pedido, nombres, apellidos, total, fecha_pedido, fecha_entrega, estado) {
    return '<tr><td>' + id_pedido + '</td><td>' + nombres + apellidos + '</td>' +
        '<td><a href="#" data-toggle="modal" data-target="#modalTask" onclick="viewDataPedido(\'' + id_pedido + '\')"x>' +
        '<i class="fas fa-clipboard-list text-success icon-lg"></i></a></td>' +
        '<td>' + total + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + estado + '</td></tr>';
}

function viewDataPedido(id_pedido, estado) {
    inHTML("loadTable2", "");
    var reference = db.ref('detalle_pedidosRG/');
    reference.on('value', function (datos) {
        var data = datos.val();
        $.each(data, function (id_detallePedido, value) {
            if (value.id_pedido == id_pedido) {
                var reference2 = db.ref('productosRG/' + value.id_producto);
                reference2.on('value', function (datos2) {
                    var data2 = datos2.val();
                    var sendData = table2(data2.producto, data2.costo, value.cantidad, value.subtotal);
                    printHTML('loadTable2', sendData);
                });
            }
        });
    });
}

function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}

function table2(producto, costo, cantidad, subtotal) {
    return '<tr><td>' + producto + '</td><td>' + costo + '</td><td>' + cantidad + '</td><td>' + subtotal + '</td></tr>';
}