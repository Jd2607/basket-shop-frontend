import Navbar from "./Navbar";
import "../estilos/Carrito.css";
import CartaProductoCarrito from "./CartaProductoCarrito";
import { useState, useEffect } from "react";
import { alertaCheck } from "../servicios/Alertas";

function Carrito(){

    const [productos,setProductos] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
    const [totalCompra,setTotalCompra] = useState(0);

    useEffect(() => {
        setTotalCompra(
            productos.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0)
        );
    }, [productos]); 

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

        setTotalCompra(nuevosProductos.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0));
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

        setTotalCompra(nuevosProductos.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0));
    };

    //esta funcion crear un registro de cada producto y su cantida y lo asocia con un pedido
    async function crearPedidoProducto(data, prod){
        const resMovimiento = await fetch("http://localhost:8000/pedido_productos/crear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pedido_id: data.id, producto_id: prod.id, cantidad: prod.cantidad, precio_unitario: prod.precio })
        });
    }

    //funcion para crear el pedido
    const crearPedido = async (e) =>{
        try {

            //obtenemos la fecha y hora
            const fechaColombiaISO = new Date().toLocaleString("sv-SE", {
                timeZone: "America/Bogota",
                hour12: false
            }).replace(" ", "T");


            //creamos un pedido
            const res = await fetch("http://localhost:8000/pedidos/crear_pedido", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //id 1 ya que solo manejamos un usuario
                body: JSON.stringify({ usuario_id: 1, valorTotal: totalCompra, fecha: fechaColombiaISO, estado: "procesado" })
            });

            const data = await res.json();


            productos.map((prod, index) => {
                crearPedidoProducto(data, prod);
            })

            alertaCheck("Pedido creado con éxito");
            localStorage.removeItem('carrito');
                setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error al crear el pedido:", error);
        }
    }


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
                            <hr></hr>
                            <button className="btn btn-primary" onClick={crearPedido}>Finalizar Compra</button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Carrito;