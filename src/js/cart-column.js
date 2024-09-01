let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartColumn = document.getElementById('cart-column');
const totalNumber = document.getElementById('total-number');
const cartClearButton = document.getElementById('cart-clear-button');
const cartBuyButton = document.getElementById('cart-buy-button');

if(cart.length){
    showCart();
}


function showCart(){
    cartColumn.innerHTML = "";
    cart.forEach(item => {
        cartColumn.innerHTML += `
        <article class="cart-article-info">
                    <img src="${item.imagen}" class="cart-img" alt="${item.nombre}">
                    <div class="cart-name">
                        <small>Producto:</small>
                        <h3>${item.nombre}</h3>
                    </div>
                    <div class="cart-price">    
                        <small>Precio:</small>
                        <p>${item.precio}</p>
                    </div>
                    <div class="cart-amount">
                        <small>Cantidad:</small>
                        <p>${item.cantidad}</p>
                    </div>
                    <div class="cart-subtotal">
                        <small>Subtotal:</small>
                        <p>${item.cantidad * item.precio}</p>
                    </div>
                    <div class="cart-delete">
                        <button class="cart-delete-button" onclick="deleteArticle(${item.productoID})"><i class="bi bi-trash-fill"></i></button>
                    </div>
        </article>
        `;
    });
    getTotal();
}

function getTotal(){
    const total = cart.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    if(total > 0){
        document.getElementById("total-title").innerText = "Total:";
        totalNumber.innerText = "$" + total;
    }else {
        document.getElementById("total-title").innerText = "";
        totalNumber.innerText = "";
    }
    
}

function clearCart(){
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteArticle(id){
    const index = cart.findIndex(item => item.productoID === id);
    if(--cart[index].cantidad <= 0){
        console.log(cart.splice(index, 1));
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}



cartClearButton.addEventListener("click", () => {
    if(cart.length == 0){
        Swal.fire({
            title: "Carrito vacío",
            icon: "info",
            showCloseButton: true,
        });
        clearCart();
        showCart(); 
    }else{
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'question',
            html: `Se van a borrar ${cart.reduce((acc, item) => acc + item.cantidad, 0)} productos.`,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
                <i class="bi bi-hand-thumbs-up-fill"></i>
            `,
            confirmButtonAriaLabel: "Thumbs up",
            cancelButtonText: `
                <i class="bi bi-hand-thumbs-down-fill"></i>
            `,
            cancelButtonAriaLabel: "Thumbs down"
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                showCart(); 
            }
        })
    }
});

cartBuyButton.addEventListener("click", () => {
    if(cart.length == 0){
        Swal.fire({
            title: "Carrito vacío",
            text: "Pruebra añadir algunos productos antes de comprar :)",
            icon: "info",
            showCloseButton: true,
        });
        clearCart();
        showCart();
    }else{
        Swal.fire({
            title: "Proceso exitoso",
            text: "¡Tu compra se realizo con exito, muchas gracias!",
            icon: "success",
            showCloseButton: true,
        });
        clearCart();
        showCart();
    }


    
});

