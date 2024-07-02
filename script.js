document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    async function fetchProducts() {
        try {
            const response = await fetch('https://germancortez.pythonanywhere.com/productos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return [];
        }
    }

    async function initialize() {
        try {
            const pathName = window.location.pathname;
            if (pathName.endsWith('product-detail.html')) {
                await displayProductDetail();
            } else {
                await displayProducts();
            }
            handleCartPage();
            handleLogin();
            handleRegistration();
            handleSearch();
        } catch (error) {
            console.error('Error al inicializar la página:', error);
        }
    }

    async function displayProducts() {
        const products = await fetchProducts();
        const productContainer = document.querySelector('.row');

        if (!productContainer) {
            console.error('Elemento .row no encontrado en el DOM.');
            return;
        }

        productContainer.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('col-lg-4','col-sm-6', 'mb-3');
            card.innerHTML = `
                <div class="card">
                    <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <h3>$${product.precio}</h3>
                        <button class="btn btn-primary add-to-cart" data-product-name="${product.nombre}" data-product-price="${product.precio}">Agregar al Carrito</button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">Ver Detalles</a>
                    </div>
                </div>
            `;
            productContainer.appendChild(card);
        });

        handleAddToCart();
    }

    async function displayProductDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
    
        if (!productId) {
            console.error('No se proporcionó el ID del producto en la URL.');
            return;
        }
    
        const productDetail = await fetchProductDetails(productId);
    
        if (productDetail) {
            const productNameElement = document.getElementById('product-name');
            const productPriceElement = document.getElementById('product-price');
            const productDescriptionElement = document.getElementById('product-description');
            const productImageElement = document.getElementById('product-image');
            const productStockElement = document.getElementById('product-stock');
    
            if (productNameElement && productPriceElement && productDescriptionElement && productImageElement && productStockElement) {
                productNameElement.innerText = productDetail.nombre;
                productPriceElement.innerText = `$${productDetail.precio}`;
                productDescriptionElement.innerText = productDetail.descripcion;
                productImageElement.src = productDetail.imagen;
                productStockElement.innerText = `Stock: ${productDetail.stock}`;
    
                document.getElementById('add-to-cart-detail').addEventListener('click', function () {
                    addToCartHandler(productDetail.nombre, productDetail.precio);
                });
            } else {
                console.error('Uno o más elementos de detalle del producto no se encontraron en el DOM.');
            }
        } else {
            console.error('Producto no encontrado');
        }
    }
    

    async function fetchProductDetails(id) {
        try {
            const response = await fetch(`https://germancortez.pythonanywhere.com/productos/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
            return null;
        }
    }

    function handleAddToCart() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productName = button.getAttribute('data-product-name');
                const productPrice = parseFloat(button.getAttribute('data-product-price'));
                addToCartHandler(productName, productPrice);
            });
        });
    }

    function addToCartHandler(name, price) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index > -1) {
            cartItems[index].quantity++;
        } else {
            cartItems.push({ name, quantity: 1, price });
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert("Producto agregado al carrito");
        updateCart();
    }

    function handleCartPage() {
        if (window.location.pathname.endsWith('cart.html')) {
            updateCart();
        }
    }

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const itemTotal = item.quantity * item.price;
            total += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="decreaseQuantityHandler('${item.name}')">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary" onclick="increaseQuantityHandler('${item.name}')">+</button>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCartHandler('${item.name}')">Eliminar</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
    }

    window.increaseQuantityHandler = function (name) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index > -1) {
            cartItems[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
        }
    }

    window.decreaseQuantityHandler = function (name) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index > -1 && cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
        } else {
            removeFromCartHandler(name);
        }
    }

    window.removeFromCartHandler = function (name) {
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }

    function handleRegistration() {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                localStorage.setItem('user', JSON.stringify({ name, email, password }));
                alert("Registro exitoso");
                window.location.href = "login.html";
            });
        }
    }

    function handleSearch() {
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                fetchProducts().then(products => {
                    const filteredProducts = products.filter(product =>
                        product.nombre.toLowerCase().includes(searchTerm) ||
                        product.descripcion.toLowerCase().includes(searchTerm)
                    );
                    displayFilteredProducts(filteredProducts);
                });
            });
        }
    }

    async function displayFilteredProducts(filteredProducts) {
        const productContainer = document.querySelector('.row');

        if (!productContainer) {
            console.error('Elemento .row no encontrado en el DOM.');
            return;
        }

        productContainer.innerHTML = '';

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('col-sm-6', 'mb-3');
            card.innerHTML = `
                <div class="card">
                    <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">${product.descripcion}</p>
                        <h3>$${product.precio}</h3>
                        <button class="btn btn-primary add-to-cart" data-product-name="${product.nombre}" data-product-price="${product.precio}">Agregar al Carrito</button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-secondary">Ver Detalles</a>
                    </div>
                </div>
            `;
            productContainer.appendChild(card);
        });

        handleAddToCart();
        handleViewDetails();
    }

    function handleViewDetails() {
        const viewDetailsButtons = document.querySelectorAll('.view-details');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const productId = button.getAttribute('data-product-id');
                if (productId) {
                    window.location.href = `product-detail.html?id=${productId}`;
                } else {
                    console.error('No se encontró el ID del producto.');
                }
            });
        });
    }

    initialize();
});
