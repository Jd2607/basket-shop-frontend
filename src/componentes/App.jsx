import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Catalogo from "./Catalogo";
import Categorias from "./Categorias";
import Inventario from "./Inventario";
import Carrito from "./Carrito";
import "../estilos/App.css";
import RutaProtegida from "../servicios/proteccionRutas";

function App() {
  return (
    <BrowserRouter>
      {/* Definición de rutas */}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/catalogo" element={<RutaProtegida> <Catalogo /> </RutaProtegida>} />
        <Route path="/categorias" element={<RutaProtegida> <Categorias /> </RutaProtegida>} />
        <Route path="/inventario" element={<RutaProtegida> <Inventario /> </RutaProtegida>} />
        <Route path="/carrito" element={<RutaProtegida> <Carrito /> </RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
