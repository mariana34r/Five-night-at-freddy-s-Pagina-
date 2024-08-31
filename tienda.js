let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(nombre, precio, imagen, categoria) {
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = { nombre, precio, imagen, categoria, cantidad: 1 };
        carrito.push(producto);
        console.log('Producto agregado:', producto);
    }
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    
   
    const mensajeAgradecimiento = document.getElementById('mensaje-agradecimiento');
    if (mensajeAgradecimiento) {
        mensajeAgradecimiento.style.display = 'none';
    }
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function ajustarCantidad(nombre, ajuste) {
    const producto = carrito.find(p => p.nombre === nombre);
    if (producto) {
        producto.cantidad += ajuste;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(nombre);
        } else {
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }
    }
}

function actualizarCarrito() {
    const productosCarrito = document.getElementById('productos-carrito-lista');
    const totalCarrito = document.getElementById('total-carrito');
    const compararBtn = document.getElementById('comparar-btn');
    
    productosCarrito.innerHTML = '<button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar Carrito</button>';
    
    let total = 0;
    
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-carrito';
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                ${producto.nombre} - $${producto.precio.toFixed(2)} 
                <div class="cantidad">
                    <button onclick="ajustarCantidad('${producto.nombre}', -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="ajustarCantidad('${producto.nombre}', 1)">+</button>
                </div>
                <span class="eliminar-btn" onclick="eliminarDelCarrito('${producto.nombre}')">x</span>
            </div>
        `;
        productosCarrito.appendChild(productoDiv);
        total += producto.precio * producto.cantidad;
    });
    
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    
    compararBtn.style.display = carrito.length > 0 ? 'block' : 'none';

    console.log('Estado del carrito:', carrito);
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function compararCompra() {
    const mensajeAgradecimiento = document.getElementById('mensaje-agradecimiento');
    if (carrito.length > 0) {
        mensajeAgradecimiento.style.display = 'block';
        vaciarCarrito(); 
    } else {
        alert('El carrito está vacío.');
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.getElementById('carrito-link').addEventListener('click', (event) => {
    event.preventDefault();
    const carritoDiv = document.getElementById('productos-carrito');
    carritoDiv.style.display = carritoDiv.style.display === 'none' || carritoDiv.style.display === '' ? 'block' : 'none';
});

document.addEventListener('DOMContentLoaded', actualizarCarrito);


