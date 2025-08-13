import Navbar from "./Navbar"
import CartaProducto from "./CartaProducto"
import { useEffect, useState } from "react";
import { obtenerProductos } from "../servicios/api";

function Catalogo(){

  //useState para almacenar los productos y controlar su estado
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos().then(data => setProductos(data))
    .catch(error => console.error('Error:', error));
  }, []); 

  return (
    <>
      <Navbar seccion = "catalogo"/>
      <h3 className="mt-3">BIENVENIDO</h3>
      <p>Explora la gran variedad de productos que tenemos para ti.</p>

      {/* recorremos la lista de productos con map */}
      <div className="container-fluid p-0">
          <div className="row gx-4 gy-4 mb-3 ms-1 me-0">
              {productos.map((producto, index) => {
              return (
                  <div className="col-3" key={index}>
                    {/* renderizamos el componente CartaProducto */}
                    {/* le enviamos mediante props el producto correspondiente */}
                  <CartaProducto prod = {producto} mostrarAñadir = {true}/>
                  </div>
              );
              })}
          </div>
      </div>

    </>
  )
}

export default Catalogo