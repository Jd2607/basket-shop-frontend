import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { obtenerCategorias } from "../servicios/api"
import { alertaCheck, alertaError, alertaInfo } from '../servicios/Alertas';

function ModalAsignarCategoria(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const productos = props.listaProductos;
  const categorias = props.listaCategorias;
  const [productoAsignar, setProductoAsignar] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({id: '', nombre: ''});
  const [categoriaNueva, setCategoriaNueva] = useState('');



    const editarCategoria = async (e) => {
        e.preventDefault();
        if (categoriaSeleccionada && categoriaNueva) { 
            console.log("Categoria seleccionada:", categoriaSeleccionada.id);
            console.log("Categoria nueva:", categoriaNueva);
            if ((categoriaSeleccionada.id != categoriaNueva)) {
                try {
                    const res = await fetch("http://localhost:8000/asignar_categoria", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ producto_id: productoAsignar, categoria_id: categoriaNueva })
                });
                const data = await res.json();
                console.log("Categoría Asignada:", data);
                alertaCheck("Categoría asignada", "La categoría se ha asignado correctamente", true);
                } catch (err) {
                    console.error("Error:", err);
                    alertaError("Error al asignar categoría", "No se pudo asignar la categoría.");
                }
            } else {
                alertaInfo("Por favor seleccione una categoria diferente");
            }
        } else {
            alertaInfo("Por favor seleccione ambas categorías");
        }
    }; 

    function seleccionCategoria(cat) {
        //cambiamos el valor de la categoria
        setProductoAsignar(cat)
        //recibimos el id del producto por lo tanto lo buscamos en el array para acceder a su categoria
        const producto = productos.find(c => c.id == cat);
        //sabiendo la id de la categoria del producto buscamos en la lista para obtener el nombre
        const categoriaEncontrada = categorias.find(c => c.id == producto.categoria_id);
        setCategoriaSeleccionada(categoriaEncontrada ? categoriaEncontrada : '');
    }

  return (
    <>
      <Button variant="secondary mb-3 btnOpcionesInventario" onClick={handleShow}>
        ASIGNAR CATEGORÍA
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>ASIGNAR CATEGORÍA</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          {/*formulario*/}
            <form>

                <div className="mb-3">
                    <label htmlFor="nombreCatSeleccionada" className="form-label">Seleccione una categoria</label>
                    <select id="selectCategoria" className="form-control" onChange={(e) => seleccionCategoria(e.target.value)} required>
                        <option value="">-- Seleccione un producto --</option>
                        {productos.map((producto, index) => {
                            return <option key={index} value={producto.id}> {producto.nombre} - {producto.id}</option>
                        })}
                    </select>
                </div>


                {/* input para el nuevo nombre de la categoria */}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Categoria actual</label>
                    <input
                    type="text"
                    id="nombreCategoriaActual"
                    className="form-control"
                    value={categoriaSeleccionada.nombre}
                    disabled
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="nombreCatSeleccionada" className="form-label">Nueva categoria</label>
                    <select id="selectCategoria" className="form-control" onChange={(e) => setCategoriaNueva(e.target.value)} required>
                        <option value="">-- Seleccione una categoria --</option>
                        {categorias.map((categoria, index) => {
                            return <option key={index} value={categoria.id}> {categoria.nombre}</option>
                        })}
                    </select>
                </div>


                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" type='submit' onClick={editarCategoria}>ASIGNAR</button>
                </div>
            </form>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalAsignarCategoria;