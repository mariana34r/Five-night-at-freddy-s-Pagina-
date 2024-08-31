document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const productosContainer = document.getElementById('productos-container');

    // funcion para el recoorer el json de los productos
    async function loadProducts() {
        const response = await fetch('productos.json');
        const productos = await response.json();
        return productos;
    }

  
    function displayProducts(productos) {
        productosContainer.innerHTML = ''; 

    
        const productosPorCategoria = productos.reduce((acc, producto) => {
            if (!acc[producto.categoria]) {
                acc[producto.categoria] = [];
            }
            acc[producto.categoria].push(producto);
            return acc;
        }, {});

       
        for (const [categoria, productos] of Object.entries(productosPorCategoria)) {
          
            const categoriaDiv = document.createElement('div');
            categoriaDiv.classList.add('categoria');

            const titulo = document.createElement('h2');
            titulo.textContent = categoria;
            categoriaDiv.appendChild(titulo);

           
            const productosDiv = document.createElement('div');
            productosDiv.classList.add('productos');

            productos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');

                productoDiv.innerHTML = `
                    <a href="${producto.enlace}" target="_blank">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </a>
                    <div class="nombre">${producto.nombre}</div>
                    <div class="precio">$${producto.precio.toFixed(2)}</div>
                    <button class="agregar-btn" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}', '${producto.categoria}')">Agregar al Carrito</button>
                `;

                productosDiv.appendChild(productoDiv);
            });

            categoriaDiv.appendChild(productosDiv);
            productosContainer.appendChild(categoriaDiv);
        }
    }

    
    function filterProducts() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        loadProducts().then(productos => {
            let filteredProducts = productos;

            if (searchText) {
                filteredProducts = filteredProducts.filter(producto =>
                    producto.nombre.toLowerCase().includes(searchText)
                );
            }

            if (selectedCategory) {
                filteredProducts = filteredProducts.filter(producto =>
                    producto.categoria === selectedCategory
                );
            }

            displayProducts(filteredProducts);
        });
    }

   
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

   
    loadProducts().then(displayProducts);
});


