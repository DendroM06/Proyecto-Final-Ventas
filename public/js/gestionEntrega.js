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
            '<td><a href="#" onclick="removeTask(\'' + id_pedido + '\')">' +
            '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
    } else {
        return '<tr><td>' + id_pedido +
            '<td><a href="#" data-toggle="modal" data-target="#modalTask" onclick="viewDataPedido(\'' + id_pedido + '\',\'' + estado + '\')">' +
            '<i class="fas fa-clipboard-list text-success icon-lg"></i></a></td>' +
            '</td><td>' + total + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + estado + '</td><td></td></tr>';
    }
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

function display(request, response) {
    return document.getElementById(request).style.display = response;
}

function table2(producto, costo, cantidad, subtotal) {
    return '<tr><td>' + producto + '</td><td>' + costo + '</td><td>' + cantidad + '</td><td>' + subtotal + '</td></tr>';
}

function value(request) {
    return document.getElementById(request).value;
}
function asignation(request, response) {
    return document.getElementById(request).value = response;
}

function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}
function dateActuality() {
    var fh = new Date();
    return fh.getFullYear() + "-" + (fh.getMonth() + 1) + "-" + fh.getDate() + " " + fh.getHours() + ":" + fh.getMinutes();
}



/*
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
}*/