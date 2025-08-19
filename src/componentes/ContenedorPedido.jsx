import { useEffect, useState } from "react";
import { obtenerProducto } from "../servicios/api";


function ContenedorPedido(props) {

    const [productos, setProductos] = useState([]);
    const [listaProds, setListaProds] = useState([]);

    useEffect(() => {
        const res = fetch(`http://localhost:8000/pedido_productos/obtener`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pedido_id: props.pedido.id })
        })
        .then(response => response.json())
        .then(data => setProductos(data))
        .catch(error => console.error("Error obteniendo productos:", error));
    }, []);



    useEffect(() => {

        //a partir de productos obtenemos una lista solo con los id's de los productos
        const listaIds = productos.reduce((acc, prod) => {
            if (!acc.includes(prod.producto_id)) {
                acc.push(prod.producto_id);
            }
            return acc;
        }, []);

        
        console.log("prods",productos)
        console.log("listaIds",listaIds);

        fetch("http://localhost:8000/productos/obtener-por-ids", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ids: listaIds})
        })
        .then(res => res.json())
        .then(data => setListaProds(data))
        .catch(err => console.error(err));
    }, [productos]);

    console.log("prods lista",listaProds)


    const detallesProductos = [];
    for (let i = 0; i < listaProds.length; i++) {
        detallesProductos.push(
            <ul key={i} style={{ display: "flex", justifyContent: "space-between", gap: "10px", listStyle: "none" }}>
                <div className="col">
                    <li>{listaProds[i].nombre} - Cantidad: {productos[i].cantidad}</li>
                </div>
                <div className="col">
                    <li>Valor unitario: {listaProds[i].precio.toLocaleString()}</li>
                </div>
                <div className="col">
                    <li>Subtotal: { (listaProds[i].precio * productos[i].cantidad).toLocaleString() } </li>
                </div>
            </ul>
        );
    }


    return (
        <div className="contenedor-pedido">
            <div className="container contenedor-pedido m-0">
                <div className="row">

                    <div className="col-4 mt-4">
                        <h5>Información del Pedido</h5>
                        <p>ID: {props.pedido.id}</p>
                        <p>Fecha: {props.pedido.fecha.split("T")[0]}</p>
                        <p>Estado: {props.pedido.estado}</p>
                    </div>

                    <div className="col-8 mt-4">
                        <div className="row">
                                <h5>Productos</h5>
                                {detallesProductos}
                            <hr></hr>
                            <p> Total compra: {props.pedido.valorTotal.toLocaleString()} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContenedorPedido;