import baloncesto from "../assets/baloncesto.png"
import "../estilos/CartaProducto.css"
import { alertaCheck } from '../servicios/Alertas.js'; 

function CartaProducto(props){

    props.prod.cantidad = 1;

    function añadirAlCarrito() {
        console.log("Producto añadido al carrito");
        const carrito = localStorage.getItem('carrito');
        if (carrito != null) {
            //parseamos para poder leer
            const productosCarrito = JSON.parse(carrito);
            //comprobamos si el producto ya existe
            const productoExistente = productosCarrito.find(item => item.id === props.prod.id);
            if (productoExistente) {
                //si existe, aumentamos la cantidad
                productoExistente.cantidad++;
            } else {
                //si no existe, lo añadimos
                productosCarrito.push(props.prod);
            }
            //sobreescribimos el carrito
            localStorage.setItem('carrito', JSON.stringify(productosCarrito));
        } else {
            //si no existe creamos el array
            const carrito = [];
            //le añadimos un producto
            carrito.push(props.prod);
            //y sobreescribimos el carrito
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }

        alertaCheck("Producto añadido", "El producto se ha añadido correctamente al carrito");
    }

    return (
        <>
            <div className="p-0" id="carta-producto"> 
                <div className="card pt-2 ps-0 pe-0 pb-0" id="contenedor-carta">
                    <center > <img src={baloncesto} alt="Logo" width="100" height="100" /></center>
                    <div className="card-body">
                        <h6 className="card-title">{props.prod.nombre}</h6>
                        <p className="card-text">{props.prod.descripcion}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">${props.prod.precio.toLocaleString()}</li>
                    </ul>
                    { props.mostrarAñadir ? (
                        <div className="card-body p-0">
                        <button type="submit" className="btn btnComprar" onClick={añadirAlCarrito}>AÑADIR AL CARRITO</button>
                    </div>
                    ) : <div className="card-body p-0">
                        Stock: {props.prod.stock}
                    </div>}
                </div>

            </div>
        </>
    )
}

export default CartaProducto;