//var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;

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
function insertTask(id_pedido, id_cliente, pedido, total, estado) {
    db.ref('pedidos1/').push({
        id_pedido: id_pedido,
        id_cliente: id_cliente,
        fecha_pedido: dateActuality(),
        fecha_entrega: '',
        pedido: pedido,
        total: total,
        estado: estado
    });
}
function onClickInsert() {
    var id_pedido = value("id_pedido");
    var id_cliente = value("id_cliente");
    var pedido = value("pedido");
    var total = value("total");
    var estado = value("estado");
    if (id_pedido.length == 0 || id_cliente.length == 0 || pedido.length == 0 || total.length == 0 || estado.length == 0) {
        alert("Por favor, complete todos los campos");
    } else {
        inHTML("loadTable", "");
        insertTask(id_pedido, id_cliente, pedido, total, estado);
        asignation("id_pedido", "");
        asignation("id_cliente", "");
        asignation("pedido", "");
        asignation("total", "");
        asignation("estado", "");
        alert("Pedido Guardado con Éxito");
    }
}
function updateTask(name, description, key) {
    db.ref('task/' + key).update({
        name: name,
        description: description,
        date: dateActuality()
    });
}
function onClickUpdate() {
    var name = value("nameEdit");
    var description = value("descEdit");
    var key = value("key");
    if (name.length == 0 || description.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        updateTask(name, description, key);
        inHTML("editData", "");
        alert("modify successfully");
        update.disabled = true;
    }
}
function removeTask(key) {
    if (confirm("¿you want to delete task?")) {
        inHTML("loadTable", "");
        db.ref('task/' + key).remove();
    }
}
function table(id_pedido, id_cliente, fecha_pedido, fecha_entrega, pedido, total, estado, key) {
    return '<tr><td>' + id_pedido + '</td><td>' + id_cliente + '</td><td>' + fecha_pedido + '</td><td>' + fecha_entrega + '</td><td>' + pedido + '</td><td>' + total + '</td><td>' + estado + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + id_pedido + '\',\'' + id_cliente + '\',\'' + fecha_pedido + '\',\'' + fecha_entrega + '\',\'' + pedido + '\',\'' + total + '\',\'' + estado + '\',\'' + key + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeTask(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(id_pedido, id_cliente, fecha_pedido, fecha_entrega, pedido, total, estado, key) {
    var response = '<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="nameEdit" class="form-control" placeholder="Name" value=' + name + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + description + '</textarea>' +
        '</div>';
    inHTML('editData', response);
    update.disabled = false;
}
var reference = db.ref('pedidos1/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (key, value) {
        var sendData = table(value.id_pedido, value.id_cliente, value.fecha_pedido, value.fecha_entrega, value.pedido, value.total, value.estado, key);
        printHTML('loadTable', sendData);
    });
});



