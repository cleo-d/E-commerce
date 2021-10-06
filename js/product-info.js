let info_product = {}
let product_data = []


//Despliego la info de "PRODUCT_INFO_URL"
function showProductInfo() {

  let htmlContentToAppend = "";


  htmlContentToAppend += `
        <div class="container mt-5">
        <h3 id="productName">${info_product.name}</h3>
        <hr class="my-3">
        <dl>
          <dt>Descripcion</dt>
          <div class="container"
            <div class="col-md-6">
            <p> ${info_product.description}</p>
            </div>
          
      
          <dt>Informacion del producto</dt>
          <dd>
          <div class="col-md-6">
           <small class="text-muted">
           <br> Precio: ${info_product.currency} ${info_product.cost} 
           <br>Cantidad vendidos: ${info_product.soldCount} Sold </small>
           </div
          </dd>
            <br>
      
          <dt>Imágenes ilustrativas</dt>
          <dd>
   
          </dd>
        </dl>
        </div>
        
       
        `


  document.getElementById("product-info").innerHTML = htmlContentToAppend;

}


//Carrousel de las fotos del producto (PRODUCT_INFO_URL)
function mostrarFotos() {

  let htmlContentToAppend = ""

  for (let index = 0; index < info_product.images.length; index++) {
    const imagenes = info_product.images[index];

    if (index == 0) {

      htmlContentToAppend += `
    <div class="carousel-item active">
    <img class="d-block w-100" src="${imagenes}" alt="First slide">
    </div>
    `
    } else {

      htmlContentToAppend += `
    <div class="carousel-item">
    <img class="d-block w-100" src="${imagenes}" alt="slide">
  </div>
    `
    }

  }

  document.getElementById("carrusel").innerHTML += htmlContentToAppend

}


//Recorro el array de los relatedProducts y despliego la informacion
function showRelatedProducts(product_data, arrayAutos) {

  for (let index = 0; index < arrayAutos.length; index++) {

    let relacionados = arrayAutos[index];


    htmlContentToAppend = ""

    htmlContentToAppend += `
    
    
        <div class="col-3">
            <img src="` + product_data[relacionados].imgSrc + `" alt="` + product_data[relacionados].description + `" class="img-thumbnail" >
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ product_data[relacionados].name + `</h4>
                <small class="text-muted">` + product_data[relacionados].soldCount + ` artículos 
                <br> ${product_data[relacionados].currency} ${product_data[relacionados].cost} 
                <br> ${product_data[relacionados].soldCount} Sold </small>
            </div>

        </div>
    </div>
    `


    document.getElementById("prod_rel").innerHTML += htmlContentToAppend

  }

}

//Despliego la info de "PRODUCT_INFO_COMMENTS_URL"
function showComments() {

  let estrellas = [`<span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>` ,

    `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>` ,

    `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>` ,

    `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>` ,

    `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>` ,

    `<span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>` ,]

  let htmlContentToAppend = ""

  for (let i = 0; i < comentarios.length; i++) {
    let comment_data = comentarios[i];

    htmlContentToAppend += `
    <div class="card">
        <div class="card-body shadow-lg p-3 bg-light rounded">
         <p class="card-text"><span class="badge badge-dark">${comentarios[i].user}</span> : ${comentarios[i].description} </p>
         <br>
         ${estrellas[comentarios[i].score]}
        </div>
        <div class="card-footer">
         <p class= "text-muted">${comentarios[i].dateTime}<p>
        </div>
    </div>
    <br>
    
    `
  }

  document.getElementById("comentarios").innerHTML = htmlContentToAppend

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


  getJSONData(PRODUCTS_URL).then(function (resultObj2) {

    if (resultObj2.status === "ok") {
      product_data = resultObj2.data


      getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          info_product = resultObj.data
          var relacionados = info_product.relatedProducts

          //Funciones que despliegan infode los productos, productos relacionados y carrousel de fotos
          showProductInfo()
          mostrarFotos()
          showRelatedProducts(product_data, relacionados)

        }

      })


    }
  })

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj3) {
    if (resultObj3.status === "ok") {
      comentarios = resultObj3.data


      //Funcion que desplega los comentarios 
      showComments()

    }
  })



});

