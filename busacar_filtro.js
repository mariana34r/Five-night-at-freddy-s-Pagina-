
function realizarBusquedaYFiltrado() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const categoria = document.getElementById('category-filter').value;
    const productos = document.querySelectorAll('#productos-container .producto');

    productos.forEach(producto => {
        
        const nombre = producto.querySelector('.precio').textContent.toLowerCase();
        const productoCategoria = producto.dataset.categoria;

       
        if ((nombre.includes(input) || input === '') && (categoria === 'todos' || productoCategoria === categoria)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}


document.getElementById('search-button').addEventListener('click', realizarBusquedaYFiltrado);


document.getElementById('filter-button').addEventListener('click', realizarBusquedaYFiltrado);

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        realizarBusquedaYFiltrado();
    }
});


function agregarAlCarrito(nombre, precio, imagen, categoria) {
    console.log(`Producto agregado: ${nombre}, Precio: ${precio}, Imagen: ${imagen}, Categoría: ${categoria}`);

}