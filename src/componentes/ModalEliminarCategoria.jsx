import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalConfirmacion from './ModalConfirmacion';
import { alertaCheck, alertaError } from '../servicios/Alertas';

function ModalEliminarCategoria(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const categorias = props.listaCategorias;
  const [categoria, setCategoria] = useState('');



  const eliminarCategoria = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/categorias/eliminar_categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: categoria})
      });
      const data = await res.json();
      console.log("Categoría eliminada:", data);
      alertaCheck("Categoría eliminada", "La categoría se ha eliminado correctamente", true);
    } catch (err) {
      console.error("Error:", err);
      alertaError("Error al eliminar categoría", "No se pudo eliminar la categoría.");
    }
  };


  return (
    <>
      <Button variant="danger mb-3 btnOpcionesCategoria" onClick={handleShow}>
        ELIMINAR
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>ELIMINAR CATEGORÍA</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          {/*formulario*/}
            <form>

                <div className="mb-3">
                    <label htmlFor="nombreCatSeleccionada" className="form-label">Seleccione una categoria</label>
                    <select id="selectCategoria" className="form-control" onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">-- Seleccione una categoría --</option>
                        {categorias.map((cat, index) => {
                            return <option key={index} value={cat.id}> {cat.nombre} </option>
                        })}
                    </select>
                </div>


                <div className="d-flex justify-content-center">
                    {categoria != "" ? <ModalConfirmacion mensaje="¿Está seguro de eliminar esta categoría?" onConfirm={eliminarCategoria} /> : null}
                </div>
            </form>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalEliminarCategoria;