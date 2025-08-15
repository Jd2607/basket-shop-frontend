import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalConfirmacion from './ModalConfirmacion';
import { alertaCheck, alertaError } from '../servicios/Alertas';

function ModalEliminarProducto(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const productos = props.listaProductos;
  const [producto, setProducto] = useState('');



  const eliminarProducto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/productos/eliminar_producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: producto})
      });
      const data = await res.json();
      console.log("Producto eliminado:", data);
      alertaCheck("Producto eliminado", "El producto se ha eliminado correctamente", true);
    } catch (err) {
      console.error("Error:", err);
      alertaError("Error al eliminar producto", "No se pudo eliminar el producto.");
    }
  };


  return (
    <>
      <Button variant="danger mt-2 btnOpcionesInventario" onClick={handleShow}>
        ELIMINAR PRODUCTO
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>ELIMINAR CATEGORÍA</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          {/*formulario*/}
            <form>

                <div className="mb-3">
                    <label htmlFor="nombreCatSeleccionada" className="form-label">Seleccione un producto</label>
                    <select id="selectCategoria" className="form-control" onChange={(e) => setProducto(e.target.value)} required>
                        <option value="">-- Seleccione un producto --</option>
                        {productos.map((prod, index) => {
                            return <option key={index} value={prod.id}> {prod.nombre} - {prod.id} </option>
                        })}
                    </select>
                </div>


                <div className="d-flex justify-content-center">
                    {producto != "" ? <ModalConfirmacion mensaje="¿Está seguro de eliminar este producto?" onConfirm={eliminarProducto} /> : null}
                </div>
            </form>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalEliminarProducto;