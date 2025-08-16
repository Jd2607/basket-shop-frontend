//libreria para hacer peticiones
import axios from "axios";

// URL servidor backend
const API_URL = "http://localhost:8000";


// funcion para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const res = await axios.get(`${API_URL}/productos`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};



//funcion para obtener un solo producto
export const obtenerProducto = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/productos/obtener`, {
      id
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};


// funcion para obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
    const res = await axios.get(`${API_URL}/categorias`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};