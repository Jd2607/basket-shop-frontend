import { useState } from "react";
import '../estilos/Navbar.css';
import { useNavigate } from "react-router-dom";
import { alertaDespedida } from "../servicios/Alertas";

function Navbar(props) {

    //navegador para redireccionar desde los botones
    const navigate = useNavigate();

    const cerrarSesion = () => {
        alertaDespedida();
        setTimeout(() => {
            // 1. Eliminar token
            localStorage.removeItem("token");
            // 2. Redirigir al login
            window.location.href = "/login";
        }, 2000);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light mt-0" id="navegacion">
                <div className="container-fluid">
                    <a className="navbar-brand">BASKET SHOP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className={`nav-link ${props.seccion === "catalogo" ? "active" : ""}`} href="/catalogo">Catálogo</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${props.seccion === "categorias" ? "active" : ""}`} href="/categorias">Categorías</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${props.seccion === "inventario" ? "active" : ""}`} href="/inventario">Inventario</a>
                            </li>
                        </ul>

                        <button id="btnPedidos" className="btn btn-danger me-3" onClick={() => navigate("/pedidos")}>
                            Mis pedidos
                        </button>

                        <button id="btnCarrito" className="btn btn-danger me-3" onClick={() => navigate("/carrito")}>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>

                        <button id="btnCerrarSesion" className="btn btn-danger" onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
