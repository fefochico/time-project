import { useContext } from "react";
import { DateContext } from "../contexts/DateContext";

export default function FormFilter() {
    const {fecha, setFecha} = useContext(DateContext);

    const handleDateChange = (event) => {
        setFecha(new Date(event.target.value));
    };
    
    return (
        <div style={{ padding: "1rem",  width: "100%"}}>
            <label style={{ display: "inline-block", marginBottom: "0.5rem", marginRight: "0.5rem" }}>Fecha:</label>       
            <input
                type="date"
                className="form-control bg-dark text-light input-dark"
                style={{ width: "200px", display: "inline-block" }}
                value={fecha.toISOString().split("T")[0]}
                onChange={handleDateChange}
            />
        </div>
    );
}