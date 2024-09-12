const carritoBoton = document.querySelector('.cart-button');
const carritoContenido = document.querySelector('.cart-content');
const itemsCarrito = document.querySelector('.cart-items');
const botonesCompra = document.querySelectorAll('.compra_carrito');
const ventanaPago = document.getElementById('ventanaPago');
const cerrarVentana = document.getElementById('cerrarVentana');
const botonPagar = document.querySelector('.button_pagar');
const formPago = document.querySelector('.formPago');
let carrito = [];

function actualizarCarrito() {
  itemsCarrito.innerHTML = ''; 

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = '<p>El carrito está vacío</p>';
    carritoContenido.style.display = 'none';
    return;
  }

  carrito.forEach(item => {
    const itemElemento = document.createElement('p');
    itemElemento.textContent = `${item.producto} - $${item.precio.toFixed(2)}`;
    itemsCarrito.appendChild(itemElemento);
  });

  carritoContenido.style.display = 'block'; 
}



function manejarCompra(e) {
  const producto = e.target.getAttribute('data-producto');
  // Reemplaza cualquier carácter no numérico del precio y convierte a número
  const precio = parseFloat(e.target.getAttribute('data-precio').replace(/[^\d.-]/g, ''));

  if (!isNaN(precio)) {
    carrito.push({ producto, precio });
    console.log(`Producto añadido: ${producto}, Precio: ${precio}`); 
    actualizarCarrito(); 
  } else {
    console.error('El precio no es un número válido:', e.target.getAttribute('data-precio'));
  }
}


botonesCompra.forEach(boton => {
  boton.addEventListener('click', manejarCompra);
});


carritoBoton.addEventListener('click', () => {
  carritoContenido.style.display = carritoContenido.style.display === 'block' ? 'none' : 'block';
});



//productos seleccionados 
function mostrarProductosSeleccionados() {
  const listaProductos = document.getElementById('listaProductos');
  listaProductos.innerHTML = ''; 

  carrito.forEach(producto => {
    const item = document.createElement('li');
    item.textContent = `${producto.producto} - $${producto.precio.toFixed(2)}`;
    listaProductos.appendChild(item);
  });
}


botonPagar.addEventListener('click', function() {
  mostrarProductosSeleccionados(); 
  ventanaPago.style.display = 'flex';
  console.log('Ventana de pago mostrada');
});
cerrarVentana.addEventListener('click', function() {
  ventanaPago.style.display = 'none'; 
  console.log('Ventana de pago cerrada');
});

formPago.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const nombre = document.getElementById('nombre').value;
  const direccion = document.getElementById('direccion').value;
  const correo = document.getElementById('correo').value;
  const pago = document.getElementById('pago').value;
  const entrega = document.getElementById('entrega').value; 

  alert(`Gracias, ${nombre}. Tu pago será procesado.\nForma de pago: ${pago}\nMétodo de entrega: ${entrega}`);

  ventanaPago.style.display = 'none';

  carrito = [];
  actualizarCarrito();
});