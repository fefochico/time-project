import { useEffect, useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ProjectContext } from "../contexts/ProjectContext";

export default function ModalFormProject({showModal, project}) {
    const {listProjects, setListProjects} = useContext(ProjectContext);
    const [show, setShow] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm({
      defaultValues: {
        name: project?.name || "",
        description: project?.description || "",
      }
    });

    useEffect(() => {
      if(!project) return;
      reset({
        name: project?.name || "",
        description: project?.description || "",
      });
      setShow(true);
    }, [showModal]);


    function saveNewProject(formData){
      const newOrUpdatedProject = {
        ...project,
        ...formData,
        date: new Date()
      };
      if(!project || !project.id){//Nuevo proyecto
        setListProjects([...listProjects, {id: (Math.random()*100000).toFixed(), ...newOrUpdatedProject}]);
      }else{ //Edición de proyecto
        const updatedProjects = listProjects.map(proj => proj.id === project.id ? newOrUpdatedProject : proj);
        setListProjects(updatedProjects);
      }
      setShow(false);
      reset();
    }

    function handleClose(){
      setShow(false);
      reset();
    }

    return (
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            <Modal.Title>{project && project.id ? "Editar" : "Añadir"} proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form id="project-form" onSubmit={handleSubmit(saveNewProject)}>
            <div className="mb-2">
                <label htmlFor="name" className="form-label">Nombre del Proyecto</label>
                <input type="text" className="form-control" id="name" {...register("name", { required: "El nombre es obligatorio" })} />
                <div className="error-container">
                  {errors.name && <p className="custom-danger">{errors.name.message}</p>}
                </div>
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea className="form-control" id="description" {...register("description")} />
                <div className="error-container"></div>
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" style={{background:"#646cff", border:"none"}} type="submit" form="project-form">
            Guardar cambios
            </Button>
        </Modal.Footer>
      </Modal>
    );
}