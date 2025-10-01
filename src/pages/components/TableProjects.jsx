import { Table, Container } from "react-bootstrap";
import { useState, useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";
import ModalFormProject from "./ModalFormProject";

export default function TableProjects() {
    const {listProjects} = useContext(ProjectContext);
    const [project, setProject] = useState(null);
    const [showModal, setShowModal]= useState(false);


    function setVisibilityModal(project = null){
        setProject(project);
        setShowModal(!showModal)
    }

    return (
    <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
            <h3 style={{ padding: "10px" }}>Proyectos</h3>
            <div style={{ width: "100%" }}>
                <button className="custom-button" onClick={()=>setVisibilityModal({name: "", description: "", date:null})} style={{ marginBottom: "10px", width: "200px", float: "right" }}>Agregar Proyecto</button>
            </div>
            <div style={{ width: "100%", maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                <Table striped bordered hover style={{ width: "100%", tableLayout: "fixed" }}>
                    <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        <tr>
                        <th style={{ width: "10%", background: "#1b1b1b" }}>ID</th>
                        <th style={{ width: "30%", background: "#1b1b1b" }}>Nombre</th>
                        <th style={{ width: "40%", background: "#1b1b1b" }}>Descripción</th>
                        <th style={{ width: "20%", background: "#1b1b1b" }}>Fecha de modificación</th>
                    </tr>
                </thead>
                <tbody>
                    {listProjects.map(project => (
                        <tr key={project.id} onClick={()=>setVisibilityModal(project)}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.date.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </div>  
        <ModalFormProject showModal={showModal} project={project}/>    
    </Container>);
}