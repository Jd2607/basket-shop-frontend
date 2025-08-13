import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function ModalConfirmacion(props) {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <Button variant="danger mb-3 btnOpcionesCategoria" onClick={handleShow}>
                ELIMINAR
            </Button>

            <Modal show={show} onHide={handleClose} dialogClassName="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>ELIMINAR</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.mensaje}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    No
                    </Button>
                    <Button variant="primary" onClick={props.onConfirm}>
                    Sí
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalConfirmacion;