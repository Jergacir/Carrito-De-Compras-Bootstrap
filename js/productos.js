document.addEventListener('DOMContentLoaded', function () {
    const productos = [
        //Funkos Pop
        {
            id: 'Funko-01',
            titulo: 'Pop! Mr. Fantastic',
            imagen: './img/producto-1.png',
            descripcion: 'Funko de Mr. Fantastic del grupo de los 4 fantásticos',
            precio: 150,
        },
        {
            id: 'Funko-02',
            titulo: 'Pop! Spider-Man',
            imagen: './img/producto-2.png',
            descripcion: 'Funko de Spider-Man del grupo de los Vengadores',
            precio: 120,
        },
        {
            id: 'Funko-03',
            titulo: 'Pop! Galactus',
            imagen: './img/producto-3.png',
            descripcion: 'Funko de GALACTUS, villano de los 4 fantásticos',
            precio: 150,
        },
        {
            id: 'Funko-04',
            titulo: 'Pop! Wolverine',
            imagen: './img/producto-4.png',
            descripcion: 'Funko de Wolverine, la mejor dupla de DeadPool',
            precio: 140,
        },

        //Ropa
        {
            id: 'Ropa-01',
            titulo: 'Hoodie',
            imagen: './img/producto-5.png',
            descripcion: 'Hoodie o polera de Funko',
            precio: 200,
        },

        //Packs
        {
            id: 'Pack-01',
            titulo: 'Polera + Pop! Flash',
            imagen: './img/producto-6.png',
            descripcion: 'Pack de Polera + Mini Pop! Flash',
            precio: 150,
        },

        //Gorra
        {
            id: 'Gorra-01',
            titulo: 'Gorra de Funko',
            imagen: './img/producto-7.png',
            descripcion: 'Gorra especial de Funko',
            precio: 100,
        },

        //Mochila
        {
            id: 'Mochila-01',
            titulo: 'Mochila de Funko',
            imagen: './img/producto-8.png',
            descripcion: 'Mochila especial de Funko',
            precio: 250,
        },
    ];

    const contenedorProductos = document.querySelector('#contenedor-productos');
    const numeroCarrito = document.querySelector('#numerito');

    cargarProductos();

    function cargarProductos() {
        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `<div class="card h-100 text-center shadow producto">
                        <img src="${producto.imagen}" class="card-img-top producto-imagen" alt="${producto.titulo}">
                        <div class="card-body border-top producto-detalles">
                            <h5 class="card-title fw-bold producto-titulo">${producto.titulo}</h5>
                            <p class="card-text producto-descripcion">${producto.descripcion}</p>
                            <p class="producto-precio">S/. ${producto.precio}</p>
                            <button type="button" id="${producto.id}" class="btn-agregar-carrito btn btn-primary">Agregar a carrito</button>
                        </div>
                    </div>`

            contenedorProductos.appendChild(div);
        });

        actualizarBotonesAgregarCarrito();
    }

    const productoEnCarritoLS = JSON.parse(localStorage.getItem('Carrito'));

    let productosEnCarrito;

    if(productoEnCarritoLS){
        productosEnCarrito = productoEnCarritoLS;
        actualizarNumeroCarrito();
    } else {
        productosEnCarrito = [];
    }

    //Actualizando el número de productos del carrito
    function actualizarNumeroCarrito(){
        let nuevoNumerito = 0;

        productosEnCarrito.forEach(producto => {
            nuevoNumerito += producto.cantidad;
        });

        numeroCarrito.innerText = nuevoNumerito;
    }

    //Agregando el producto al carrito
    function actualizarBotonesAgregarCarrito(){
        const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');

        botonesAgregarCarrito.forEach(boton => {
            boton.addEventListener('click', agregarCarrito);
        });
    }
    
    function agregarCarrito(e){
        const botonId = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === botonId);

        if(productosEnCarrito.some(producto => producto.id === botonId)){
            const index = productosEnCarrito.findIndex(producto => producto.id === botonId);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }

        actualizarNumeroCarrito();
        localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito));
    }
});
