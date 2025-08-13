import baloncesto from "../assets/baloncesto.png";

function CartaProductoCarrito(props){

    return (
        <>
            <div className="cartaCarrito mb-3">
                <div className="row">
                    {/* imagen del producto */}
                    <div className="col-2">
                        <img className="imgLogoProdCarrito" src={baloncesto} alt="Logo" width="100" height="100" />
                    </div>

                    {/* informacion del producto */}
                    <div className="col-5 ms-3 gy-2">
                        <div className="row mb-2"> {props.prod.nombre} </div>
                        <div className="row descripcionProdCarrito">{props.prod.descripcion}</div>
                    </div>

                    {/* precio del producto */}
                    <div className="col-2 d-flex align-items-center">${(props.prod.precio * props.prod.cantidad).toLocaleString()}</div>

                    {/* opciones del producto */}
                    <div className="col-2">
                        <div className="row mt-2 mb-2 ms-0"><button className="btn btn-danger btnBorrarCarrito" onClick={() => props.onEliminar(props.prod.id)}><i className="fa-solid fa-trash"></i></button></div>
                        <div className="row ms-0 divCantidad" >
                            <div>
                                {props.prod.cantidad} Und.
                                <button className="btn" onClick={() => props.onAumentar(props.prod.id)}><i className="fa-solid fa-circle-plus ms-0"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartaProductoCarrito;