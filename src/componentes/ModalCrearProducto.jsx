import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { alertaCheck, alertaError, alertaInfo } from '../servicios/Alertas';

function ModalCrearProducto(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

   // validaciones cero y numeros negativos
  const handlePrecioChange = (e) => {
    const val = e.target.value;
    if (val === '' || (Number(val) > 0 && !val.startsWith('-'))) {
      setPrecio(val);
    }
  };

  const handleStockChange = (e) => {
    const val = e.target.value;
    if (val === '' || (Number(val) > 0 && !val.startsWith('-'))) {
      setStock(val);
    }
  };

  //esto se reemplazara por las categorias
  const listaCategorias = props.listaCategorias;

  const guardarProducto = async (e) => {
    e.preventDefault();
    if (nombre && descripcion && precio && categoria && stock) {

      const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        stock,
        categoria_id: categoria
      };

      try {
        const res = await fetch("http://localhost:8000/productos/crear_producto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( nuevoProducto )
        });
        const data = await res.json();
        console.log("Producto creado:", data);
        alertaCheck("Producto creado", "El producto se ha creado correctamente", true);
      } catch (err) {
        console.error("Error:", err);
        alertaError("Error al crear producto", "No se pudo crear el producto.");
      }
    } else {
      alertaInfo("Por favor complete todos los campos");
    }
  };


  return (
    <>
      <Button variant="primary mb-4 btnOpcionesInventario" onClick={handleShow}>
        CREAR PRODUCTO
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>CREAR PRODUCTO</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          {/*formulario*/}
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del artículo</label>
                    <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    maxLength={29}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    />
                    <div className="form-text">{nombre.length} / 29 caracteres</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                    id="descripcion"
                    className="form-control"
                    maxLength={70}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={2}
                    required
                    />
                    <div className="form-text">{descripcion.length} / {70} caracteres</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                    type="number"
                    id="precio"
                    className="form-control"
                    min="1"
                    step="any"
                    value={precio}
                    onChange={handlePrecioChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select
                    id="categoria"
                    className="form-select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    >
                    <option value="">-- Seleccione una categoría --</option>
                    {listaCategorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input
                    type="number"
                    id="stock"
                    className="form-control"
                    min="1"
                    step="1"
                    value={stock}
                    onChange={handleStockChange}
                    required
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={guardarProducto}>CREAR</button>
                </div>
            </form>

        </Modal.Body>

      </Modal>
    </>
  );
}

export default ModalCrearProducto;