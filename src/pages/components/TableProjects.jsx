import { useState, useContext } from "react";
import ModalProyecto from "./ModalProyecto";
import { ProjectContext } from "../contexts/ProjectContext";
import { Row, Col } from "react-bootstrap";

export default function TableProjects() {
  const {listProjects, setListProjects}= useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const [proyectoActual, setProyectoActual] = useState(null);

  const handleGuardar = (datos) => {
    datos.date= (new Date()).toLocaleDateString();
    if (proyectoActual) {
      setListProjects(prev =>
        prev.map(p => (p.id === proyectoActual.id ? datos : p))
      );
    } else {
      datos.id= (Math.random()*100000).toFixed();
      setListProjects(prev => [...prev, datos]);
    }
    setProyectoActual(null);
  };

  const abrirModalNuevo = () => {
    setProyectoActual(null);
    setTimeout(()=>setShowModal(true),100);
  };

  const abrirModalEditar = (proyecto) => {
    setProyectoActual(proyecto);
    setTimeout(()=>setShowModal(true),100);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Proyectos</h2>
      <button className="btn btn-primary mb-3" onClick={abrirModalNuevo}>
        Nuevo proyecto
      </button>

      <ul className="list-group">
        {listProjects.map((p, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="w-100">
              <Row>
              <Col sm={3}>
              {p.id}
              </Col>
              <Col sm={6}>
              {p.nombre}
              </Col>
              <Col sm={3}>
              {p.date}
              </Col>
            </Row>
            </div>
            
            <button className="btn btn-sm btn-outline-secondary" onClick={() => abrirModalEditar(p)}>
              Editar
            </button>
          </li>
        ))}
      </ul>

      <ModalProyecto
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleGuardar}
        proyecto={proyectoActual}
      />
    </div>
  );
}