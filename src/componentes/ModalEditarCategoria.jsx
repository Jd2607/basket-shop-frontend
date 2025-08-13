import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { obtenerCategorias } from "../servicios/api"

function ModalEditarCategoria(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [nombre, setNombre] = useState('');
  const categorias = props.listaCategorias;
  const [categoria, setCategoria] = useState('');



  const editarCategoria = async (e) => {
    e.preventDefault();
    if (categoria !== "") {
      try {
        const res = await fetch("http://localhost:8000/editar_categoria", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoria_id: categoria, nuevo_nombre: nombre })
      });
      const data = await res.json();
      console.log("Categoría editada:", data);
      handleClose();
      alert("Categoría editada exitosamente");
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
    }
  } else {
    alert("Por favor seleccione una categoría");
  }
};


  return (
    <>
      <Button variant="secondary mb-3 btnOpcionesCategoria" onClick={handleShow}>
        EDITAR
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>EDITAR CATEGORÍA</Modal.Title>
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


                {/* input para el nuevo nombre de la categoria */}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nuevo nombre</label>
                    <input
                    type="text"
                    id="nombreCategoriaNueva"
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
                    <button className="btn btn-primary" type='submit' onClick={editarCategoria}>EDITAR</button>
                </div>
            </form>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalEditarCategoria;