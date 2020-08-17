//var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;

var reference = db.ref('pedidos1/');
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
        insertTask(id_cliente, pedido, total, estado);
        asignation("id_cliente", "");
        asignation("pedido", "");
        asignation("total", "");
        asignation("estado", "");
        alert("Pedido Guardado con Éxito");
    }
}

function insertTask(id_cliente, pedido, total, estado) {
    db.ref('pedidos1/').push({
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
    db.ref('pedidos1/' + id_pedido).update({
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
        db.ref('pedidos1/' + id_pedido).remove();
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