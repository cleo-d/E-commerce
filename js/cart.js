const DESAFIATE_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"


let dataCarrito = []

var subtotal = 0

let costo_envio = 0

cuentaTotal = 0


//Funcion que despliega la info del JSON con la data de cada articulo
function showCart(lista) {

  let htmlContentToAppend = ""

  for (let index = 0; index < lista.length; index++) {
    const items = lista[index];



    let subtotal = items.unitCost * items.count

    htmlContentToAppend += `
    
       <tr>
        <td><img src="${items.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${items.name}</td>
        <td class="align-middle" id="items_price">${items.currency}$ ${items.unitCost}</td>
        <td class="align-middle"><input type="number" onchange="updateProductoSubtotal(event)" min ="1" value=${items.count} data-indice="${index}" data-indiceprecio="${items.unitCost}"></td>
        <td class="align-middle"><span id="subtotal-${index}">${items.currency}$ ${subtotal} <button onlclick="borrarItem(${index})"><i class="fas fa-trash-alt"></i></button></span></td> 
        </tr>
        
        `

  }
  document.getElementById("table-body").innerHTML = htmlContentToAppend + document.getElementById("table-body").innerHTML

}

function borrarItem(item) {

  dataCarrito.splice(item, 1)


}

//Convierto el valor de la moneda de todos los articulos del JSON en "UYU"
function cambiarMonedaUYU(lista) {

  for (let index = 0; index < lista.length; index++) {
    let items = lista[index]

    if (items.currency === "USD") {
      items.currency = "UYU"
      items.unitCost = items.unitCost * 40
    }

  }


}


//Funcion que relaciona el precio de cada producto con su respectiva cantidad 
function updateProductoSubtotal(event) {

  let item = event.target

  let subtotal = item.value * item.dataset.indiceprecio

  let item_id = "subtotal-" + item.dataset.indice

  dataCarrito[item.dataset.indice].count = item.value

  document.getElementById(item_id).innerHTML = "UYU" + "$" + " " + subtotal

  totalDeLosSubtotales(dataCarrito)
}

//Funcion que suma todos los subtotales
function totalDeLosSubtotales(lista) {

  let cuentaTotal = 0

  for (let index = 0; index < lista.length; index++) {
    const items = lista[index];

    var subtotal = items.unitCost * items.count

    cuentaTotal += parseInt(subtotal)

    document.getElementById("totales").innerHTML = ` UYU$ ${cuentaTotal} `
    document.getElementById("productCostText").innerHTML = ` UYU$ ${cuentaTotal} `

  }


  let precio_envio = 0
  let precioEnvioHTML = document.getElementById("comissionText");
  let precioTotalHTML = document.getElementById("totalCostText");


  if (document.getElementById("premiumradio").checked) {
    let costo_envio = 0.15
    precio_envio = costo_envio * cuentaTotal

    precioEnvioHTML.innerHTML = ` $ ${precio_envio} `
    precioTotalHTML.innerHTML = ` $ ${precio_envio + cuentaTotal} `


  } else if (document.getElementById("expressradio").checked) {
    let costo_envio = 0.07
    precio_envio = subtotal * costo_envio

    precioEnvioHTML.innerHTML = ` $ ${precio_envio} `
    precioTotalHTML.innerHTML = ` $ ${precio_envio + cuentaTotal} `

  } else if (document.getElementById("standardradio").checked) {
    let costo_envio = 0.05
    precio_envio = subtotal * costo_envio

    precioEnvioHTML.innerHTML = ` $ ${precio_envio} `
    precioTotalHTML.innerHTML = ` $ ${precio_envio + cuentaTotal} `

  }


}




function dataEnvios() {
  alert(`
  CONDICIONES DE ENVIOS:

  - Premium (2-5 días) - Costo del 15% sobre el subtotal
  - Express (5-8 días) - Costo del 7% sobre el subtotal
  - Standard (12 a 15 días) - Costo del 5% sobre el subtotal.
  `)
}

function validarTarjeta() {

  let numTarjeta = document.getElementById("numero_tarjeta").value
  let nomTarjeta = document.getElementById("nombre_tarjeta").value
  let fechaVencMes = document.getElementById("venc_mes").value
  let fechaVencaño = document.getElementById("venc_año").value
  let cvv = document.getElementById("cvv").value

  if (numTarjeta != "" && nomTarjeta != "" && fechaVencMes != "" && fechaVencaño != "" && cvv != "") {

    alert("Tarjeta Acceptada")

  } else {
    alert("Ingrese los campos vacios")
  }

}

function validarCompra() {
  let calle = document.getElementById("calle_direccion").value
  let numero = document.getElementById("numero_direccion").value
  let esquina = document.getElementById("esquina_direccion").value
  let pais = document.getElementById("pais_direccion").value

  let numTarjeta = document.getElementById("numero_tarjeta").value
  let nomTarjeta = document.getElementById("nombre_tarjeta").value
  let fechaVencMes = document.getElementById("venc_mes").value
  let fechaVencaño = document.getElementById("venc_año").value
  let cvv = document.getElementById("cvv").value

  if ((calle != "" && numero != "" && esquina != "" && pais != "") && (numTarjeta != "" && nomTarjeta != "" && fechaVencMes != "" && fechaVencaño != "" && cvv != "")) {

    alert("Gracias por su compra!")

  } else {

    alert("Por favor ingrese los campos vacios")

  }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(DESAFIATE_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      dataCarrito = resultObj.data.articles

      cambiarMonedaUYU(dataCarrito)
      showCart(dataCarrito)
      totalDeLosSubtotales(dataCarrito)


    }
  })

});