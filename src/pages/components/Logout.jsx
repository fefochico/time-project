import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <div style={{ float: "right"}}>
        <button className="btn btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}