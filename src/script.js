var category = 'todos';

//Botones de Filtros Laterales
document.getElementById('sort-asc').addEventListener('click', function() {
    resetButtonColors('.filter1');
    sortProductsByPrice(true);
    buttonChangeColor('sort-asc');
});

document.getElementById('sort-desc').addEventListener('click', function () {
    resetButtonColors('.filter1');
    sortProductsByPrice(false);
    buttonChangeColor('sort-desc');
});

document.getElementById('sort-discount').addEventListener('click', function () {
    resetButtonColors('.filter1');
    sortProductsByDiscount();
    buttonChangeColor('sort-discount');
});

var slider = document.getElementById("slider");
var maxPrice = document.getElementById("max-price");

slider.addEventListener("input", function () {
    maxPrice.textContent = this.value + "€";
    productsInRange(category)
});

//Botones de Filtros Superiores
document.getElementById('todos').addEventListener('click', function () {
    resetButtonColors('.filter2');
    category = 'todos';
    productsInRange(category);
    buttonChangeColor('todos');
});

document.getElementById('palas').addEventListener('click', function () {
    resetButtonColors('.filter2');
    category = 'pala';
    productsInRange(category);
    buttonChangeColor('palas');
});

document.getElementById('zapatillas').addEventListener('click', function () {
    resetButtonColors('.filter2');
    category = 'zapatilla';
    productsInRange(category);
    buttonChangeColor('zapatillas');
});

document.getElementById('camisetas').addEventListener('click', function () {
    resetButtonColors('.filter2');
    category = 'camiseta';
    productsInRange(category);
    buttonChangeColor('camisetas');
});

//Función para ordenar los productos según precio
function sortProductsByPrice(ascending) {
    const productsContainer = document.querySelector('.products');
    let products = document.querySelectorAll('.product');
    products = Array.from(products);

    products.sort(function (a, b) {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace('€', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace('€', ''));
        if (ascending == true){
            return priceA - priceB;
        }
        else {
            return priceB - priceA;
        }
    });

    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }

    for (let i = 0; i < products.length; i++) {
        productsContainer.appendChild(products[i]);
    }
}

//Función para que cambie el color de fondo del botón una vez hayan hecho click
function buttonChangeColor(buttonId){
    var button = document.getElementById(buttonId);
    button.style.backgroundColor = "#006400";
    button.style.color = "#ffffff";
}

//Función para que resetee el color de fondo del botón por si ha habido algún click en otro botón
function resetButtonColors(filter) {
    var buttons = document.querySelectorAll(filter); 

    buttons.forEach(function (button) {
        button.style.backgroundColor = "";
        button.style.color = "";
    });
}

//Filtro más rebajados
function sortProductsByDiscount() {
    const productsContainer = document.querySelector('.products');
    let products = document.querySelectorAll('.product');
    products = Array.from(products);

    products.sort(function (a, b) {
        var discountA = getDiscountValue(a);
        var discountB = getDiscountValue(b);

        // Si algún producto no tiene descuento, colócalo al final
        if (discountA === null) return 1;
        if (discountB === null) return -1;

        return discountA - discountB;
    });

    while (productsContainer.firstChild) {
        productsContainer.removeChild(productsContainer.firstChild);
    }

    for (let i = 0; i < products.length; i++) {
        productsContainer.appendChild(products[i]);
    }
}

function getDiscountValue(productElement) {
    var offerLabel = productElement.querySelector('.offer-label');
    if (offerLabel) {
        var discountText = offerLabel.textContent.trim().replace('%', '');
        return parseInt(discountText);
    }
    return null;
}

//Filtro de precio
function productsInRange(category) {
    var slider = document.getElementById("slider");
    var maxPrice = parseFloat(slider.value);

    var products = document.querySelectorAll('.product');

    for (let i = 0; i < products.length; i++) {
        var productCategory = products[i].getAttribute('id');
        var precioProducto = parseFloat(products[i].querySelector('.price').textContent);

        if ((category === 'todos' || category === productCategory) && precioProducto <= maxPrice) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}

// Función para agregar un producto al carrito
document.querySelectorAll('.cartButton').forEach(function (button) {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const producto = event.target.closest('.product'); // Obtener el elemento del producto
    const nombre = producto.querySelector('.name').textContent;
    const precio = parseFloat(producto.querySelector('.price').textContent.replace('€', ''));

    // Verificar si el carrito está vacío
    const carritoVacio = document.getElementById('carrito').childElementCount === 0;

    if (carritoVacio == true) {
        // Si el carrito está vacío, agregar una cabecera
        const carrito = document.getElementById('carrito');
        carrito.innerHTML = `
            <div class="cabecera-carrito">
                <div>Foto</div>
                <div>Nombre</div>
                <div>Unidades</div>
                <div>Total</div>
                <div>Eliminar</div>
            </div>
        `;
    }

    // Verificar si el producto ya está en el carrito
    const productosEnCarrito = document.querySelectorAll('.producto-nombre');
    let productoExistente = null;

    productosEnCarrito.forEach(productoEnCarrito => {
        if (productoEnCarrito.textContent === nombre) {
            productoExistente = productoEnCarrito.closest('.producto-carrito');
        }
    });

    if (productoExistente) {
        // Si el producto ya está en el carrito, actualizar la cantidad y el total
        const cantidadElemento = productoExistente.querySelector('.cantidad');
        let cantidad = parseInt(cantidadElemento.textContent) + 1;
        cantidadElemento.textContent = cantidad;

        const totalElemento = productoExistente.querySelector('.total');
        let total = parseFloat(totalElemento.textContent) + precio;
        totalElemento.textContent = total.toFixed(2) + ' €';
    } else {
        // Si el producto no está en el carrito, agregar un nuevo elemento
        const imagenSrc = producto.querySelector('.image img').src;

        // Crear un nuevo elemento de producto en el carrito
        const productoCarrito = document.createElement('div');
        productoCarrito.classList.add('producto-carrito');
        productoCarrito.innerHTML = `
            <div class="producto-imagen">
                <img class="producto-imagen" src="${imagenSrc}">
            </div>
            <div class="producto-nombre">${nombre}</div>
            <div class="cantidad">1</div>
            <div class="total">${precio.toFixed(2) + ' €'}</div> 
            <div class="eliminar">
            <img class="eliminar" src="/assets/papelera-de-reciclaje.png">
            </div>
        `;

        document.getElementById('carrito').appendChild(productoCarrito);
    }

    mostrarTotalPagar();
}


// Función para eliminar un producto del carrito
document.getElementById('carrito').addEventListener('click', eliminarProducto);
function eliminarProducto(event) {
    if (event.target.classList.contains('eliminar')) {
        const productoAEliminar = event.target.closest('.producto-carrito');
        productoAEliminar.remove();
        const precioProductoEliminado = parseFloat(productoAEliminar.querySelector('.total').textContent.replace('€', ''));
        mostrarTotalPagar(-precioProductoEliminado);
    }
}


// Función para mostrar el total a pagar debajo de los productos en el carrito
function mostrarTotalPagar(precio) {
    const productos = document.querySelectorAll('.producto-carrito');
    let totalPagar = 0;

    productos.forEach(producto => {
        const precioProducto = parseFloat(producto.querySelector('.total').textContent.replace('€', ''));
        totalPagar += precioProducto;
    });

    const totalPagarDiv = document.createElement('div');
    totalPagarDiv.textContent = 'Total a Pagar: ' + totalPagar.toFixed(2) + ' €';
    totalPagarDiv.style.fontWeight = 'bold';
    totalPagarDiv.classList.add('total-cart');

    const pagarButton = document.createElement('button');
    pagarButton.textContent = 'Pagar';
    pagarButton.classList.add('final-button');
    pagarButton.id = 'final-button';

    const carrito = document.getElementById('carrito');
    const botonPagarActual = carrito.querySelector('.final-button');
    const totalActual = carrito.querySelector('.total-cart');

    if (botonPagarActual) {
        botonPagarActual.remove();
    }
    if (totalActual) {
        totalActual.remove();
    }

    carrito.appendChild(totalPagarDiv);
    carrito.appendChild(pagarButton);

    pagarButton.addEventListener('click', pagar);
}

function pagar() {
    alert('¡Enhorabuena! ¡Se puede decir que eres muy friki del pádel!');
}




