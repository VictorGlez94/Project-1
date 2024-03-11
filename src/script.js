document.getElementById('sort-asc').addEventListener('click', function() {
    sortProductsByPrice(true);
});

document.getElementById('sort-desc').addEventListener('click', function () {
    sortProductsByPrice(false);
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
