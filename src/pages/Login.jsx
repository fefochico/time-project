import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const [errorCredentials, setErrorCredentials] = useState(null);
  const navigate = useNavigate();

  const { 
      register, 
      handleSubmit, 
      formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const sendResult = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    // Simulación de login correcto:
    if (formData.email === "test@test.com" && formData.password === "1234") {
      localStorage.setItem("auth", true);
      navigate("/home");
    } else {
      setErrorCredentials("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <form id="login" onSubmit={handleSubmit(sendResult)} className="login-form">
        <h2>Iniciar sesión</h2>
        <div>
          <label htmlFor="email" className="form-label">Correo</label>
          <input
            type="email"
            className="form-control bg-dark text-light input-dark"
            {...register("email", { required: "El correo es obligatorio" })}
          />
          <div className="error-container">
            {errors.email && <span className="custom-danger">{errors.email.message}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control bg-dark text-light input-dark"
            {...register("password", { required: "Este campo es obligatorio" })}
          />
          <div className="error-container">
            {errors.password && <span className="custom-danger">{errors.password.message}</span>}
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} style={{ padding: "0.5rem 1rem", background: "#646cff", color: "#fff", border: "none", borderRadius: "4px", width: "100%"}}>
          {isSubmitting ? "Entrando..." : "Enviar"} {/* Indica estado de carga */}
        </button>
        <div className="credentials-error">
          {errorCredentials && <p style={{ color: "red", background: "#fff", borderRadius: "4px", padding: "0.5rem"}}>{errorCredentials}</p>}
        </div>
      </form>
    </div>
  );
}
