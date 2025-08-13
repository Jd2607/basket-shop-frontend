import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaProtegida;
