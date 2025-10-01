import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ActivityContext } from "../contexts/ActivityContext";   
import { useForm } from "react-hook-form";
import { ProjectContext } from "../contexts/ProjectContext";


export default function ModalFormActivity({showModal, activity}) {
    const {listActivities, setListActivities} = useContext(ActivityContext);
    const {listProjects}= useContext(ProjectContext);
    const [show, setShow] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm({
      defaultValues: {
        project: activity?.project || "",
        description: activity?.description || "",
        time: activity?.time ? String(activity.time) : ""
      }
    });

    useEffect(() => {
      if(!activity) return;
      reset({
        project: activity?.project || "",
        description: activity?.description || "",
        time: activity?.time ? String(activity.time) : ""
      });
      setShow(true);
    }, [showModal]);


    function saveNewActivity(formData){
      const newOrUpdatedActivity = {
        ...activity,
        ...formData
      };
      if(!activity || !activity.id){//Nueva actividad
        setListActivities([...listActivities, {id: (Math.random()*10000).toFixed(), ...newOrUpdatedActivity}]);
      }else{ //Edición de actividad
        const updatedActivities = listActivities.map(act => act.id === activity.id ? newOrUpdatedActivity : act);
        setListActivities(updatedActivities); 
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
            <Modal.Title>{activity && activity.id ? "Editar" : "Añadir"} trabajo realizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form id="activity-form" onSubmit={handleSubmit(saveNewActivity)}>
            <div className="mb-2">
                <label htmlFor="project" className="form-label">Proyecto</label>
                <select 
                className="form-select" 
                id="project" 
                {...register("project", { 
                  required: "Elegir un proyecto es obligatorio", 
                  validate: value => value !== "" || "Elegir un proyecto es obligatorio"
                })}
                >
                <option value="" disabled>Selecciona un proyecto</option>
                {listProjects.map(project => (
                  <option key={project.id} value={project.id}>{project.id}{' - '+project.name}</option>
                ))}
                </select>
                <div className="error-container">
                  {errors.project && <p className="custom-danger">{errors.project.message}</p>}
                </div>
            </div>
            <div className="mb-2">
                <label htmlFor="description" 
                className="form-label">Tarea</label>
                <input type="text" 
                className="form-control" 
                id="description" 
                {...register("description")} />
                <div className="error-container"></div>
            </div>
            <div className="mb-2">
                <label htmlFor="time" className="form-label">Tiempo (horas)</label>
                <input type="number" 
                className="form-control" 
                id="time" 
                {...register("time", { 
                    required: "El tiempo es obligatorio", 
                    valueAsNumber: true,
                    min: { value: 1, message: "El tiempo mínimo es de una hora" } 
                })} />
                <div className="error-container">
                  {errors.time && <p className="custom-danger">{errors.time.message}</p>}
                </div>
            </div>
            </form> 
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" style={{background:"#646cff", border:"none"}} type="submit" form="activity-form">
            Guardar cambios
            </Button>
        </Modal.Footer>
      </Modal>
    );
}