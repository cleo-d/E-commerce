let datos = { }
 


function setearUsuario(){

    datos = {

        Nombre :  document.getElementById("nombre").value ,
        Apellido : document.getElementById("apellido").value ,
        Edad : document.getElementById("edad").value ,
        Email : document.getElementById("email").value ,
        Telefono : document.getElementById("telefono").value ,
        
       }

    localStorage.setItem("perfil", JSON.stringify(datos))

    let datoslocalstorage = JSON.parse(localStorage.getItem("perfil")) 

    localStorage.setItem("perfil", JSON.stringify(datos));

    console.log(datoslocalstorage.Nombre)
 
}

function getUsuario(){

    localStorage.getItem("perfil", JSON.stringify(datos))
    localStorage.setItem("perfil", JSON.stringify(datos))

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getUsuario()
});
