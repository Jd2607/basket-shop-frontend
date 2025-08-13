import Navbar from "./Navbar";
import CartaProducto from "./CartaProducto";
import "../estilos/Inventario.css"
import ModalCrearProducto from "./ModalCrearProducto";
import { useEffect, useState } from "react";
import { obtenerProductos, obtenerCategorias } from "../servicios/api";
import ModalAsignarCategoria from "./ModalAsignarCategoria";

function Inventario(){

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        obtenerProductos().then(data => setProductos(data)).catch(error => console.error('Error:', error));
        obtenerCategorias().then(data => setCategorias(data)).catch(error => console.error('Error:', error));
    }, [])

    const productoSimplificados = () => {

        const listaProd = [];

        productos.map((producto, index) => {
            listaProd.push({"id": producto.id, "nombre": producto.nombre, "categoria_id": producto.categoria_id})
        })

        return listaProd;
    }
    
    console.log(productoSimplificados())
    
    return (
        <>
            <Navbar seccion = "inventario"/>
            <h3 className="mt-3">CONTROL DE INVENTARIO</h3>

            <div className="container-fluid p-0 mt-3">
                <div className="row gx-4 gy-4 mb-3 ms-1 me-0">

                    {/* aqui se mostraran los productos existentes */}
                    <div className="col-9">
                        <div className="row">
                            {productos.map((producto, index) => {
                                return (
                                    <div className="col-4 mb-3" key={index}>
                                    <CartaProducto prod = {producto} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* aqui se mostraran las opciones de inventario */}
                    <div className="col-3 sticky-top bg-light overflow-auto" id="opciones-inventario">
                        <div className="row">
                            <ModalCrearProducto listaCategorias={categorias} />
                            <ModalAsignarCategoria listaProductos={productoSimplificados()} listaCategorias={categorias} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inventario;