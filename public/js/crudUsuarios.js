coleccionUsuarios = db.ref().child("usuarios");
bodyUsuarios = $("#bodyUsuarios").val();
//console.log(bodyUsuarios);
//Cargar imagen Modal Editar
var fichero;
function inicializarImagenASubir() {  
  $("#imagen").prop("src", '');
  fichero = document.getElementById("fichero");
  fichero.value = '';
  fichero.addEventListener("change", subirImagenAFirebase, false);
}
var nuevaImagen;
function subirImagenAFirebase() {
  var imagenAsubir = fichero.files[0];
  var ImagenProceso = stRef
    .child("usuarios/" + imagenAsubir.name)
    .put(imagenAsubir);
  // Funcion subida
  ImagenProceso.on(
    "state_changed",
    function (snapshot) {
      // Progreso
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Subiendo: " + progress + "% completo");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("La subida a sido pausada");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("La subida se esta ejecutando");
          break;
      }
    },
    function (error) {
      console.log("Ocurrio un error");
      // Handle unsuccessful uploads
    },
    function () {
      ImagenProceso.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("La imagen se completo de subir: ", downloadURL);
        nuevaImagen = downloadURL;
        $("#imagen").prop("src", nuevaImagen);      
        nuevaImagen = '';  
      });
    }
  );
}

//console.log(coleccionUsuarios);
$("form").submit(function (e) {
  e.preventDefault();
  let id = $("#id").val();
  let uid = $("#uid").val();
  let admin = $("#admin").val();
  let nombre = $("#nombre").val();
  let apellido = $("#apellido").val();
  let email = $("#email").val();
  let telefono = $("#telefono").val();
  let imagen = $("#imagen").attr("src");
  //console.log('Esta url quier ' + imagen);
  //console.log('Esta url quieroooo ' + nuevaImagen);
  console.log('Valor a: ' + admin);

  if (admin == 'Si') {
    admin = true;
  }else if(admin == 'No') {
    admin = false;
  }
  let idFirebase = id;
  if (idFirebase == "") {
    idFirebase = coleccionUsuarios.push().key;
  }
  data = {
    admin: admin,
    uid: uid,
    nombre: nombre,
    apellido: apellido,
    email: email,
    telefono: telefono,
    imagen: imagen,
  };
  actualizacionData = {};
  actualizacionData[`/${idFirebase}`] = data;
  coleccionUsuarios.update(actualizacionData);
  id = "";
  $("form").trigger("reset");
  $("#modalAltaEdicion").modal("hide");
});
//Cargar Usuarios en Tabla
const iconoEditar =
  '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar =
  '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
function mostrarUsuarios({ admin, nombre, apellido, email, telefono, imagen, uid}) {
  var imgAdmin;
  var imgAlt;
  if (admin == true) {
    imgAdmin = "../assets/img/si.png";
    imgAlt = "true";
  }else{
    imgAdmin = "../assets/img/no.png";
    imgAlt = "false";
  }
  return `
  <td><img src="${imgAdmin}" id="imgAdmin" alt="${imgAlt}"></td>
  <td>${nombre}</td>
  <td>${apellido}</td>
  <td>${email}</td>
  <td>${telefono}</td>
  <td><img src="${imagen}" id="imgTabla" width="75px"></td>
  <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${iconoBorrar}</button></td>
  <td hidden>${uid}</td>
  `;
}
//CHILD_ADDED
coleccionUsuarios.on("child_added", (data) => {
  let tr = document.createElement("tr");
  tr.id = data.key;
  tr.innerHTML = mostrarUsuarios(data.val());
  document.getElementById("bodyUsuarios").appendChild(tr);
});
//CHILD_CHANGED
coleccionUsuarios.on("child_changed", (data) => {
  let nodoEditado = document.getElementById(data.key);
  nodoEditado.innerHTML = mostrarUsuarios(data.val());
});
//CHILD_REMOVED
coleccionUsuarios.on("child_removed", (data) => {
  let nodoEditado = document.getElementById(data.key);
  document.getElementById("bodyUsuarios").removeChild(nodoEditado);
});

//Programación de los botones del modal para Añadir Producto
$("#btnNuevo").click(function () {
  inicializarImagenASubir();
  $("#id").val("");
  $("#uid").val("");
  $("#admin").val("");
  $("#nombre").val("");
  $("#apellido").val("");
  $("#email").val("");
  $("#telefono").val("");
  $("#imagen").val("");
  $("form").trigger("reset");
  $("#modalAltaEdicion").modal("show");
});

//cargar campos de Usuarios de la tabla para editarlos
$("#tablaUsuarios").on("click", ".btnEditar", function () {
  inicializarImagenASubir();
  let id = $(this).closest("tr").attr("id");
  let admin = $(this).closest("tr").find("td:eq(0) img").attr("alt");
  let uid = $(this).closest("tr").find("td:eq(7)").text();
  let nombre = $(this).closest("tr").find("td:eq(1)").text();
  let apellido = $(this).closest("tr").find("td:eq(2)").text();
  let email = $(this).closest("tr").find("td:eq(3)").text();
  let telefono = $(this).closest("tr").find("td:eq(4)").text();
  //let imagen = $(this).closest('tr').find('td:eq(4)').text();
  let imagen = $(this).closest("tr").find("td:eq(5) img").attr("src");
  if (admin == 'true') {
    admin = 'Si';    
  }else{
    admin = 'No';
  }
  $("#id").val(id);
  $("#admin").val(admin);
  $("#uid").val(uid);
  $("#nombre").val(nombre);
  $("#apellido").val(apellido);
  $("#email").val(email);
  $("#telefono").val(telefono);
  $("#imagen").prop("src", imagen);
  console.log(imagen);
  $("#modalAltaEdicion").modal("show");
});

//cargar campos de Usuarios de la tabla para eliminarlos
$("#tablaUsuarios").on("click", ".btnBorrar", function () {
  Swal.fire({
    title: "¿Está seguro de eliminar el usuario?",
    text: "¡Está operación no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.value) {
      let id = $(this).closest("tr").attr("id"); //capturamos el atributo ID de la fila
      db.ref(`usuarios/${id}`).remove(); //eliminamos el producto de firebase
      //instanciaUser.deleteUser($("#uid").val());      
      Swal.fire("¡Eliminado!", "El Usuario ha sido eliminado.", "success");
    }
  });
});
