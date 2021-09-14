
document.addEventListener("DOMContentLoaded", function(e){

});


function asegurarUsuario() {

    let nombreusuario = localStorage.getItem("Usuario")

    if (nombreusuario == null) {

        location.href = "index.html"
    }

}

asegurarUsuario()