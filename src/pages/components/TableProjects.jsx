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
        <div className="table-container">
            <h3 className="p-2">Proyectos</h3>
            <div className="w-100">
                <button className="custom-button" onClick={()=>setVisibilityModal({name: "", description: "", date:null})} style={{ marginBottom: "10px", width: "200px", float: "right" }}>Agregar Proyecto</button>
            </div>
            <div className="w-100 scrollable-container">
                <Table striped bordered hover className="w-100">
                    <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        <tr>
                        <th className="custom-header-table" style={{ width: "10%" }}>ID</th>
                        <th className="custom-header-table" style={{ width: "30%" }}>Nombre</th>
                        <th className="custom-header-table" style={{ width: "40%"}}>Descripción</th>
                        <th className="custom-header-table" tyle={{ width: "20%"}}>Fecha de modificación</th>
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