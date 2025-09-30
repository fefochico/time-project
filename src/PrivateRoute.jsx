import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children}) {
    const isAuthenticated = localStorage.getItem("auth")==="true"; // Cambia esto según tu lógica de autenticación
    return isAuthenticated ? children : <Navigate to="/login" />;
}