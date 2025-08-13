import Navbar from "./Navbar";
import "../estilos/Carrito.css";
import CartaProductoCarrito from "./CartaProductoCarrito";
import { useState } from "react";

function Carrito(){

    const carrito = localStorage.getItem('carrito');
    const [productos,setProductos] = useState(JSON.parse(carrito) || []);

    const actualizarCarrito = (id) => {
        const nuevosProductos = productos
            .map((prod) => {
            if (prod.id === id) {
                // Reducir cantidad si es mayor a 1
                if (prod.cantidad > 1) {
                return { ...prod, cantidad: prod.cantidad - 1 };
                }
                // Si solo queda 1, lo eliminaremos filtrando después
                return null;
            }
            return prod; // Producto sin cambios
            })
            .filter((prod) => prod !== null); // Eliminamos los productos con cantidad 0

        // Actualizamos el estado en React
        setProductos(nuevosProductos);

        // Guardamos en localStorage
        localStorage.setItem('carrito', JSON.stringify(nuevosProductos));
    };

    const aumentarCantidad = (id) => {
        const nuevosProductos = productos.map((prod) => {
            if (prod.id === id) {
            // Aumentamos la cantidad en 1
            return { ...prod, cantidad: prod.cantidad + 1 };
            }
            return prod; // Productos que no cambian
        });

        // Actualizamos la lista de productos
        setProductos(nuevosProductos);

        // Guardamos en localStorage
        localStorage.setItem('carrito', JSON.stringify(nuevosProductos));
    };



    return (
        <>
            <Navbar />
            {productos.length === 0 ? (
            <div className="text-center" id="divCarrito_vacio">
                <h7><i class="fa-solid fa-cart-shopping" id="carritoIcon"></i></h7>
                <p id="txtCarrito_vacio">Tu carrito está vacio.</p>
            </div>
            ) : (
            <div className="row">
                {/* aca se mostraran los elementos del carrito */}
                <div className="col-8">
                    <div className="row">
                        <div className="mt-4 ms-4" id="divCarrito_contenido">
                            {productos.map((prod, index) => (
                                <CartaProductoCarrito key={index} prod={prod} onEliminar={actualizarCarrito} onAumentar={aumentarCantidad} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* aca se mostrara la cuenta */}
                <div className="col-4">
                    <div className="row">
                        <div className="mt-4 ms-5" id="divCarrito_cuenta">
                            <p>CUENTA TOTAL</p>
                            <hr></hr>
                            <p>${productos.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Carrito;