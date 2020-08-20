todosDatos();

function todosDatos() {
    inHTML("loadTable", "");
    document.getElementById('fechaInicio').value = "";
    document.getElementById('fechaFin').value = "";
    var reference = db.ref('pedidosRG/');
    reference.on('value', function (datos) {
        var data = datos.val();
        $.each(data, function (id_pedido, value) {
            var reference2 = db.ref('usuarios/' + value.id_cliente);
            reference2.on('value', function (datos2) {
                var data2 = datos2.val();
                var sendData = table(id_pedido, data2.nombre, data2.apellido, value.total, value.fecha_pedido, value.fecha_entrega, value.estado);
                printHTML('loadTable', sendData);
            });
        });
    });
}


function filtrarDatos() {
    if (document.getElementById('fechaInicio').value == "" || document.getElementById('fechaFin').value == "") {
        alert('Elija una fecha de inicio y una fecha final para filtar los datos')
    } else {
        inHTML("loadTable", "");
        var reference = db.ref('pedidosRG/');
        reference.on('value', function (datos) {
            var data = datos.val();
            $.each(data, function (id_pedido, value) {
                var desde = new Date(document.getElementById('fechaInicio').value);
                var hasta = new Date(document.getElementById('fechaFin').value);

                var _date = new Date(value.fecha_pedido);

                if (_date >= desde && _date <= hasta) {
                    var reference2 = db.ref('usuarios/' + value.id_cliente);
                    reference2.on('value', function (datos2) {
                        var data2 = datos2.val();
                        var sendData = table(id_pedido, data2.nombre, data2.apellido, value.total, value.fecha_pedido, value.fecha_entrega, value.estado);
                        printHTML('loadTable', sendData);
                    });
                }
            });
        });
    }
}

function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}

function table(id_pedido, nombres, apellidos, total, fecha_pedido, fecha_entrega, estado) {
    return '<tr><td>' + id_pedido + '</td><td>' + nombres + ' ' + apellidos + '</td>' +
        '<td><a href="#" data-toggle="modal" data-target="#modalTask" onclick="viewDataPedido(\'' + id_pedido + '\')"x>' +
        '<i class="fas fa-clipboard-list text-success icon-lg"></i></a></td>' +
        '<td>' + total + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + estado + '</td></tr>';
}

function viewDataPedido(id_pedido, estado) {
    inHTML("loadTable2", "");
    var reference = db.ref('detalle_pedidosRG/');
    reference.on('value', function (datos) {
        var data = datos.val();
        var _subtotal = 0;
        $.each(data, function (id_detallePedido, value) {
            if (value.id_pedido == id_pedido) {
                var reference2 = db.ref('productos/' + value.id_producto);
                reference2.on('value', function (datos2) {
                    var data2 = datos2.val();
                    var subt = (parseFloat(data2.precio) * parseFloat(value.cantidad));
                    var sendData = table2(data2.categoria, data2.nombre, data2.precio, value.cantidad, subt);
                    printHTML('loadTable2', sendData);
                    _subtotal += subt;
                    document.getElementById('labelSubtotal').innerText = _subtotal.toFixed(2);
                    document.getElementById('labelIva').innerText = (_subtotal * 0.12).toFixed(2);
                    document.getElementById('labelTotal').innerText = (_subtotal + (_subtotal * 0.12)).toFixed(2);
                });
            }
        });
    });
}

function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}

function table2(categoria, producto, costo, cantidad, subtotal) {
    return '<tr><td>' + categoria + '</td><td>'+ producto + '</td><td>' + costo + '</td><td>' + cantidad + '</td><td>' + subtotal + '</td></tr>';
}