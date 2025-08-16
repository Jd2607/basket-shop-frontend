import Navbar from "./Navbar";
import "../estilos/Pedidos.css";
import ContenedorPedido from "./ContenedorPedido";
import { useEffect, useState } from "react";

function Pedidos(){

    const [pedidos,setPedidos] = useState([]);

    //obtener pedidos
    useEffect(() => {
        const res = fetch("http://localhost:8000/pedidos")
        .then(response => response.json())
        .then(data => setPedidos(data))
        .catch(error => console.error("Error obteniendo pedidos:", error));
    }, [])



    return (
        <>
            <Navbar /> 
            <h2 className="m-3">Pedidos</h2>

            {pedidos.length === 0 ? (
                <div className="text-center" id="divPedidos_vacio">
                    <h7><i className="fa-solid fa-file-invoice-dollar" id="iconPedidos"></i></h7>
                    <p id="txtPedidos_vacio">Tu lista de pedidos está vacía.</p>
                </div>
            ) : (
            <div className="row" id="contPrincipal">
                 {/* aca se mostraran los elementos del carrito */}
                <div className="col-12 ms-3">
                    <div className="row" id="contSecundario">
                        <div className="mt-4 ms-4 me-4" id="divPedidos_contenido">
                            {pedidos.map((pedido, index) => (
                                <ContenedorPedido key={index}  pedido={pedido} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            )} 

        </>
    )
}

export default Pedidos;