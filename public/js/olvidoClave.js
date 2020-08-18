const cambioPassword = document.querySelector("#cambioPassword");
cambioPassword.addEventListener("submit", (e) => {
    e.preventDefault();
    recuperarClave();
  });

var recuperarClave = function () {
  var emailAddress = $("#RcEmail").val();
  auth.sendPasswordResetEmail(emailAddress).then(
    function () {
      Swal.fire({
        title: "Licorera DBCR",
        text: "Verifica tu correo electrónico",
        footer: "Por favor, sigue los pasos indicados.",
        imageUrl: "../assets/img/verificar.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    },
    function (error) {
      console.log;
    }
  );
};
