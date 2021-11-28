let datos = {}


// Funcion que agarra los datos de los inputs
function setearUsuario() {

    datos = {

        Nombre: document.getElementById("nombre").value,
        Apellido: document.getElementById("apellido").value,
        Edad: document.getElementById("edad").value,
        Email: document.getElementById("email").value,
        Telefono: document.getElementById("telefono").value,

    }

    localStorage.setItem("perfil", JSON.stringify(datos))

}

// Funcion que va a buscar informacion del perfil de el local storage
function getUsuario() {

    datos = JSON.parse(localStorage.getItem("perfil"))

    document.getElementById("nombre").value = datos.Nombre 
    document.getElementById("apellido").value = datos.Apellido
    document.getElementById("edad").value = datos.Edad
    document.getElementById("email").value = datos.Email
    document.getElementById("telefono").value = datos.Telefono

}



 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getUsuario()

});
