

function showProductInfo(info1, info2, info3) {

    let htmlContentToAppend = "";

    let images = "" ;

    for (let i = 0 ; i < info1.images.length ; i++ ) {
        images += `<img class= "secundaria" src = "${info1.images[i]}"> `
    }

    let ProductosRelacionados = "" ;

    for (let i = 0 ; i < info2.relatedProducts ; i++ ) {
        ProductosRelacionados += `<p class= "mb-1 p-5 ">${productos[info2.relatedProducts][1].name} </p> `
    }

        htmlContentToAppend += `
        <div class="container mt-5">
        <h3 id="productName">${info1.name}</h3>
        <hr class="my-3">
        <dl>
          <dt>Descripcion</dt>
          <dd>
            <p> ${info1.description}</p>
          </dd>
      
          <dt>Informacion del producto</dt>
          <dd>
          <small class="text-muted">
          <br> Precio: ${info1.currency} ${info1.cost} 
          <br>Cantidad vendidos: ${info1.soldCount} Sold </small>
          </dd>
            <br>
          <dt>Criterio para incluir productos en esta categoría</dt>
          <dd>
            <p id="productCriteria"></p>
          </dd>
      
          <dt>Imágenes ilustrativas</dt>
          <dd>
            <div>
            ${images}
            </div>
          </dd>
        </dl>
        </div>
        <a type="button" class="btn btn-light btn-lg btn-block" href="products.html">Ver productos</a>
       
        `


        document.getElementById("product-info").innerHTML = htmlContentToAppend;
    }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ 

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            info = resultObj.data
            
            getJSONData(PRODUCTS_URL).then(function(resultObj2) {

                if (resultObj2.status === "ok") {
                    
                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj3) {
                        if (resultObj3.status === "ok") {

                           

                        showProductInfo(resultObj.data, resultObj2.data, resultObj3.data);
                    }
  
                });
            }

        });
        }
    }); 
});     

 

