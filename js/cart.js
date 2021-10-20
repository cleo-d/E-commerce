const DESAFIATE_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"


let dataCarrito = []


//Funcion que despliega la info del JSON con la data de cada articulo
function showCart(lista) {

  for (let index = 0; index < lista.length; index++) {
    const items = lista[index];

    let htmlContentToAppend = ""

    let subtotal = items.unitCost * items.count

    htmlContentToAppend += `
    
       <tr>
        <td><img src="${items.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${items.name}</td>
        <td class="align-middle" id="items_price">${items.currency}$ ${items.unitCost}</td>
        <td class="align-middle"><input type="number" onchange="updateProductoSubtotal(event)" min ="1" value=${items.count} data-indice="${index}" data-indiceprecio="${items.unitCost}"></td>
        <td class="align-middle"><span id="subtotal-${index}">${items.currency}$ ${subtotal}</span></td>
        </tr>
        
        `
    document.getElementById("table-body").innerHTML += htmlContentToAppend
    
  }

 
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
  let htmlContentToAppend = ""

  for (let index = 0; index < lista.length; index++) {
    const items = lista[index];

    let subtotal = items.unitCost * items.count

    cuentaTotal += parseInt(subtotal)

    document.getElementById("totales").innerHTML = ` UYU$ ${cuentaTotal} `
    document.getElementById("productCostText").innerHTML = ` UYU$ ${cuentaTotal} `

  }
  
}

function calcularCostosTotales() {
}


function dataEnvios() {
  alert(`
  CONDICIONES DE ENVIOS:

  - Premium (2-5 días) - Costo del 15% sobre el subtotal
  - Express (5-8 días) - Costo del 7% sobre el subtotal
  - Standard (12 a 15 días) - Costo del 5% sobre el subtotal.
  `)
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
