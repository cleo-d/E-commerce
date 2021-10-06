//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
document.getElementById("bottonlogin").addEventListener("click", login())
});

  
function login() {


  let UsuarioInput = document.getElementById("inputEmail").value
  let password = document.getElementById("inputPassword").value

  localStorage.setItem("Usuario", UsuarioInput)
    console.log("prueba")
  if (((UsuarioInput !== "" ) && (UsuarioInput.includes("@")) ) && (password !== "" ) ) {
    
    location.href = "Home.html"
    } 

  }








