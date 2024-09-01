let cart =  JSON.parse(localStorage.getItem("cart")) || [];
// let cart = [];

let products = []

fetch('./src/js/products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    listProducts(products)
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));



const articlesGrid = document.getElementById('articles-grid');
const mainTitleTxT = document.getElementById('main-title');
const categoryButtons = document.querySelectorAll('.button-category');
const cartNumber = document.getElementById('cart-number');

listProducts(products);

if(cart.length){
    setNumber();
}

function listProducts(articlesList) {
    articlesGrid.innerHTML = "";
    articlesList.forEach(currentArticle => {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <div class="card-img">
            <img src="${currentArticle.imagen}" alt="${currentArticle.nombre}">
        </div>
        <div class="card-name">
            <p class="lower">${currentArticle.nombre}</p>
        </div>
        <div class="card-buttons">
            <button class="card-icon more-btn" id="${currentArticle.productoID}"><i class="bi bi-file-earmark-plus"></i></button>
            <div>
                <span class="card-price">${currentArticle.precio}</span>
            </div>
            <button class="card-icon" id="${currentArticle.productoID}"><i class="bi bi-cart2"></i></button>
        </div>
        `;
        articlesGrid.append(article);
    })

    const cartButtons = document.querySelectorAll(".card-icon");

    cartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            addToCart(products.find(product => product.productoID == e.currentTarget.id));
        })
    })
}

function addToCart(product){
    const isInside = cart.find(item => item.productoID === product.productoID);
    
    if(isInside !== undefined){
        isInside.cantidad++;
    } else{
        product.cantidad = 1;
        cart.push(product);
    }
    setNumber();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function setNumber(){
    cartNumber.innerText = cart.reduce((acc, currentProduct) => acc + currentProduct.cantidad, 0);
}



categoryButtons.forEach(currentButton => {
    currentButton.addEventListener("click", (e) => {
        document.querySelector(".active").classList.remove("active");
        e.currentTarget.classList.add("active");
        mainTitleTxT.innerText = currentButton.innerText;
        currentButton.innerText !== "Todos los productos" ? listProducts(products.filter(product => product.categoria.nombre === currentButton.innerText)) : listProducts(products);
    })
});


