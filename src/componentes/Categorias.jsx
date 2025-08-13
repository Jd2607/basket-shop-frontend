import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import "../estilos/Categorias.css";
import CartaProducto from "./CartaProducto";
import ModalEliminarCategoria from "./ModalEliminarCategoria";
import { obtenerCategorias, obtenerProductos } from "../servicios/api";
import ModalCrearCategoria from "./ModalCrearCategoria";
import ModalEditarCategoria from "./ModalEditarCategoria";

function Categorias(){

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [txtCategoria, setTxtCategoria] = useState("");

    //useState para almacenar los productos y controlar su estado
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    //obtenemos los productos y las categorias
    useEffect(() => {
        obtenerProductos().then(data => setProductos(data)).catch(error => console.error('Error:', error));
        obtenerCategorias().then(data => setCategorias(data)).catch(error => console.error('Error:', error));
    }, [])

    //funcion para añadir detalles a la vista
    function cambiarCategoriaSeleccionada(cat){
        //cambiamos la categoria seleccionada, la manejamos mediante su ID
        setCategoriaSeleccionada(cat.id);
        //cambiamos el texto de la categoria para mostrarlo en pantalla
        setTxtCategoria(cat.nombre);
    }


    return (
        <>
            <Navbar seccion="categorias" />

            <div className="container-fluid">
                <div className="row mt-3">

                    {/*esta fila mostrara las categorias a elegir*/}
                    <div className="col-9">
                        {/* creamos un boton para cada categoria */}
                        <div className="row">
                            {categorias.map((categoria, index) => (
                                <div key={index} className="col-3 mb-3">
                                    <button className="btn btnCategoria" onClick={() => cambiarCategoriaSeleccionada(categoria)}>
                                        {categoria.nombre}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*esta fila mostrara las opciones para crear, editar y eliminar*/}
                    <div className="col-3 pe-4">
                        <div className="row">
                            <ModalCrearCategoria />
                            <ModalEditarCategoria listaCategorias={categorias} />
                            <ModalEliminarCategoria listaCategorias={categorias} />
                        </div>
                    </div>
                </div>

                <h3>Categoria: {txtCategoria}</h3>

                <div className="row mt-3">
                    {/* verificamos que ya se haya elegido una opcion de categoria */}
                    {categoriaSeleccionada != null ? productos.map((producto, index) => {
                        {/* de ser asi recorremos la lista de productos */}
                        if (producto.categoria_id === categoriaSeleccionada) {
                            {/* solo mostraremos aquellos cuya id coincida con la id de la categoria elegida */}
                            return <div className="col-3 mb-4" key={index}> <CartaProducto prod={producto} /> </div>
                        }
                    }) : <p>Selecciona una categoría para ver los productos.</p>}
                </div>
            </div>
        </>
    )
}


export default Categorias;