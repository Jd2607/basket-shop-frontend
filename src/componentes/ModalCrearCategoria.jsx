import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { alertaCheck, alertaError } from '../servicios/Alertas';

function ModalCrearCategoria() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [nombre, setNombre] = useState('');

  const crearCategoria = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/categorias/crear_categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre })
      });
      const data = await res.json();
      alertaCheck("Categoría creada", "La categoría se ha creado correctamente", true);
    } catch (err) {
      console.error("Error:", err);
      alertaError("Error al crear categoría", "No se pudo crear la categoría.");
    }
  };


  return (
    <>
      <Button variant="primary mb-3 btnOpcionesCategoria" onClick={handleShow}>
        CREAR
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>CREAR CATEGORÍA</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          {/*formulario*/}
            <form>
                {/* input para el nombre de la categoria */}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre de la categoria</label>
                    <input
                    type="text"
                    id="nombreCategoria"
                    className="form-control"
                    minLength={3}
                    maxLength={20}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    />
                    <div className="form-text">{nombre.length} / 20 caracteres</div>
                </div>

                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" type='submit' onClick={crearCategoria}>CREAR</button>
                </div>
            </form>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalCrearCategoria;