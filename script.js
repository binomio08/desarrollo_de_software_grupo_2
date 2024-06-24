document.addEventListener("DOMContentLoaded", function () {
    // Ejemplo de datos del carrito
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Productos disponibles en la tienda (ejemplo)
    const products = [
        {
            name: "Espatula Carol",
            price: 500,
            description: "Resistente al calor.",
            image: "asset/espatula carol.jpeg"
        },
        {
            name: "Set de Cuchillos",
            price: 10000,
            description: "Ideales para cocinar.",
            image: "asset/setCuchillos.webp"
        }
    ];

    // Inicializar eventos y funcionalidades
    initialize();

    function initialize() {
        handleAddToCart();
        handleCartPage();
        handleProductDetailPage();
        handleLogin();
        handleRegistration();
        handleSearch();
    }

    // Manejar eventos de agregar al carrito
    function handleAddToCart() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = button.getAttribute('data-product-name');
                const productPrice = parseFloat(button.getAttribute('data-product-price'));
                addToCart(productName, productPrice);
            });
        });
    }

    // Función para agregar un artículo al carrito
    function addToCart(name, price) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index > -1) {
            cartItems[index].quantity++;
        } else {
            cartItems.push({ name, quantity: 1, price });
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert("Producto agregado al carrito");
    }

    // Actualizar el carrito en la página del carrito
    function handleCartPage() {
        if (window.location.pathname.endsWith('cart.html')) {
            updateCart();
        }
    }

    // Función para actualizar el carrito
    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const itemTotal = item.quantity * item.price;
            total += itemTotal;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity('${item.name}')">-</button>
                        ${item.quantity}
                        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity('${item.name}')">+</button>
                    </td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Eliminar</button></td>
                </tr>
            `;
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
    }

    // Función para aumentar la cantidad de un artículo en el carrito
    function increaseQuantity(name) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index > -1) {
            cartItems[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
        }
    }

    // Función para disminuir la cantidad de un artículo en el carrito
    function decreaseQuantity(name) {
        const index = cartItems.findIndex(item => item.name === name);
        if (index > -1 && cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
        } else {
            removeFromCart(name);
        }
    }

    // Función para eliminar un artículo del carrito
    function removeFromCart(name) {
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }

    // Manejar detalles del producto
    function handleProductDetailPage() {
        if (window.location.pathname.endsWith('product-detail.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const product = urlParams.get('product');

            const productDetail = products.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === product);

            if (productDetail) {
                document.getElementById('product-name').innerText = productDetail.name;
                document.getElementById('product-price').innerText = `$${productDetail.price}`;
                document.getElementById('product-description').innerText = productDetail.description;
                document.getElementById('product-image').src = productDetail.image;

                document.getElementById('add-to-cart-detail').addEventListener('click', function() {
                    addToCart(productDetail.name, productDetail.price);
                });
            }
        }
    }

    // Manejar formulario de inicio de sesión
    function handleLogin() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                // Validar usuario
                if (email === "user@example.com" && password === "password") {
                    alert("Inicio de sesión exitoso");
                    window.location.href = "index.html";
                } else {
                    alert("Correo o contraseña incorrectos");
                }
            });
        }
    }

    // Manejar formulario de registro
    function handleRegistration() {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                // Guardar usuario (simple demostración, no almacenar así en producción)
                localStorage.setItem('user', JSON.stringify({ name, email, password }));
                alert("Registro exitoso");
                window.location.href = "login.html";
            });
        }
    }

    // Función para manejar la búsqueda de productos
    function handleSearch() {
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
                displayFilteredProducts(filteredProducts);
            });
        }
    }

    // Función para mostrar productos filtrados
    function displayFilteredProducts(filteredProducts) {
        const productContainer = document.querySelector('.row');
        productContainer.innerHTML = '';

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('col-sm-6', 'mb-3');
            card.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <h3>$${product.price}</h3>
                        <button class="btn btn-primary add-to-cart" data-product-name="${product.name}" data-product-price="${product.price}">Agregar al Carrito</button>
                        <a href="product-detail.html?product=${product.name.toLowerCase().replace(/\s+/g, '-')}" class="btn btn-secondary">Ver Detalles</a>
                    </div>
                </div>
            `;
            productContainer.appendChild(card);
        });
    }
});
