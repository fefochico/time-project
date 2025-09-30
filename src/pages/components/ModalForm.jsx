import { useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import MyModal from "./MyModal";
import { ActivityContext } from "../contexts/ActivityContext";   
import { useForm } from "react-hook-form";



export default function ModalForm({ showModal, setShowModal, activity, setActivity }) {
    const {listActivities, setListActivities} = useContext(ActivityContext);

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors },
        reset
    } = useForm({
      defaultValues: {
        project: activity ? activity.project : "",
        description: activity ? activity.description : "",
        time: activity ? activity.time : ""
      }
    });

    function saveNewActivity(formData){
      console.log("Form Data Submitted: ", formData);
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
      setActivity(null);
      setShowModal();
      reset()
    }

    function handleClose(){
      setActivity(null);
      setShowModal();
      reset()
    }

    return (
      <MyModal show={showModal} setVisibility={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Añadir trabajo realizado</Modal.Title>
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
                <option value="1">Proyecto 1</option>
                <option value="2">Proyecto 2</option>
                <option value="3">Proyecto 3</option>
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
            <Button variant="primary" type="submit" form="activity-form">
            Guardar cambios
            </Button>
        </Modal.Footer>
      </MyModal>
    );
}