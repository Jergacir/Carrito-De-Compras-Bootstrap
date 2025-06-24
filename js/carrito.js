document.addEventListener('DOMContentLoaded', function () {

    const numeroCarrito = document.querySelector('#numerito');
    const msjCarritoVacio = document.querySelector('#msg-carrito-vacio');
    const msjCarritoComprado = document.querySelector('#msg-carrito-comprado');
    const contenedorProductosCarrito = document.querySelector('#carrito-productos')
    const contenedorAcciones = document.querySelector('#carrito-acciones');
    const totalCompra = document.querySelector('#total');
    const botonVaciarCarrito = document.querySelector('#btn-vaciar-carrito');
    const botonComprar = document.querySelector('#btn-comprar');

    const productosEnCarrito = JSON.parse(localStorage.getItem('Carrito'));

    //Cargar productos de carrito
    cargarCarrito();

    function cargarCarrito() {
        if (productosEnCarrito !== null && productosEnCarrito.length > 0) {
            msjCarritoVacio.classList.add('d-none');
            msjCarritoComprado.classList.add('d-none');
            contenedorProductosCarrito.classList.remove('d-none');
            contenedorAcciones.classList.remove('d-none');

            contenedorProductosCarrito.innerHTML = '';

            productosEnCarrito.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('carrito-producto', 'px-4', 'd-flex', 'flex-wrap', 'justify-content-between', 'align-items-center');
                div.id = producto.id;
                div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="carrito-producto-titulo">
                            <small>Nombre del producto</small>
                            <h5>${producto.titulo}</h5>
                        </div>
                        <div class="carrito-producto-cantidad text-center">
                            <small>Cantidad</small>
                            <div class="botones-cantidad d-flex gap-2 mb-3">
                                <button class="btn-disminuir-cantidad border-0 text-bg-success rounded"><i
                                        class="fa-solid fa-minus"></i></button>
                                <p class="m-0 fw-semibold">${producto.cantidad}</p>
                                <button class="btn-aumentar-cantidad border-0 text-bg-success rounded"><i
                                        class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>S/. ${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>S/. ${producto.precio * producto.cantidad}</p>
                        </div>

                        <button class="carrito-producto-eliminar border-0 text-bg-danger rounded">
                            <i class="fa-solid fa-trash"></i>
                        </button>`
                contenedorProductosCarrito.appendChild(div);

            });


        } else {
            msjCarritoVacio.classList.remove('d-none');
            msjCarritoComprado.classList.add('d-none');
            contenedorProductosCarrito.classList.add('d-none');
            contenedorAcciones.classList.add('d-none');
        }

        actualizarTotal();
        actualizarNumeroCarrito();
        actualizarBotonesEliminar();
        actualizarBotonesReducirCantidad();
        actualizarBotonesAumentarCantidad();
    }

    //Actualizando el número de productos del carrito
    function actualizarNumeroCarrito() {
        let nuevoNumerito = 0;

        productosEnCarrito.forEach(producto => {
            nuevoNumerito += producto.cantidad;
        });

        numeroCarrito.innerText = nuevoNumerito;
    }

    //Elimnar productos del carrito
    function actualizarBotonesEliminar() {
        const botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');

        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarProducto);
        })
    }

    function eliminarProducto(e) {
        const productoId = e.currentTarget.closest('.carrito-producto').id;

        const index = productosEnCarrito.findIndex(producto => producto.id === productoId);
        productosEnCarrito.splice(index, 1);

        cargarCarrito();

        localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));

    }

    //Reducir cantidad de un producto
    function actualizarBotonesReducirCantidad() {
        const botonesReducirCantidad = document.querySelectorAll('.btn-disminuir-cantidad');

        botonesReducirCantidad.forEach(boton => {
            boton.addEventListener('click', reducirCantidadProducto);
        })
    }

    function reducirCantidadProducto(e) {
        const productoId = e.currentTarget.closest('.carrito-producto').id;

        const index = productosEnCarrito.findIndex(producto => producto.id === productoId);

        if (productosEnCarrito[index].cantidad === 1) {
            productosEnCarrito.splice(index, 1);
        } else {
            productosEnCarrito[index].cantidad--;
        }

        cargarCarrito();

        localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
    }

    //Aumentar la cantidad de un producto
    function actualizarBotonesAumentarCantidad() {
        const botonesAumentarCantidad = document.querySelectorAll('.btn-aumentar-cantidad');

        botonesAumentarCantidad.forEach(boton => {
            boton.addEventListener('click', aumentarCantidadProducto);
        })
    }

    function aumentarCantidadProducto(e) {
        const productoId = e.currentTarget.closest('.carrito-producto').id;

        const index = productosEnCarrito.findIndex(producto => producto.id === productoId);

        productosEnCarrito[index].cantidad++;

        cargarCarrito();

        localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
    }

    //Vaciar Carrito
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);

    function vaciarCarrito() {
        productosEnCarrito.length = 0;

        localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
        //localStorage.clear();

        cargarCarrito();
    }


    //Actualizar Total
    function actualizarTotal() {
        let total = 0;

        productosEnCarrito.forEach(producto => {
            total += producto.cantidad * producto.precio;
        });

        totalCompra.innerText = 'S/.' + total;
    }

    //Realizar compra
    botonComprar.addEventListener('click', realizarCompra);

    function realizarCompra() {
        productosEnCarrito.length = 0;

        localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));

        cargarCarrito();

        msjCarritoVacio.classList.add('d-none');
        msjCarritoComprado.classList.remove('d-none');
    }
});
