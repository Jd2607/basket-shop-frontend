import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Login.css';
import { useState } from 'react'

function Login() {

    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    async function iniciarSesion() {
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: usuario, password: contrasena })
        });

        if (!response.ok) throw new Error("Credenciales incorrectas");
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        alert("Inicio de sesión exitoso");
        window.location.href = "/catalogo"; // Redirigir al catálogo después de iniciar sesión
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div id="contenedor-principal" className="p-4 shadow rounded">
                <h3 className="text-center mb-4">INICIAR SESIÓN</h3>

                <div className="mb-5">
                    <label className="form-label mb-0 mt-2">USUARIO</label>
                    <input type="text" className="form-control" id="inputUsuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    <div id="usuarioTexto" className="form-text">Digite su usuario.</div>
                </div>

                <div className="mb-4">
                    <label className="form-label mb-0">CONTRASEÑA</label>
                    <input type="password" className="form-control" id="contrasenaUsuario" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                    <div id="contrasenaTexto" className="form-text">Digite su contraseña.</div>
                </div>

                <div className="d-grid">
                    <button type="submit" id='btnIniciar' className="btn" onClick={iniciarSesion}>INGRESAR</button>
                </div>

            </div>
        </div>
    );
}

export default Login;
