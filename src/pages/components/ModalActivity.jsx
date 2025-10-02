import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';

export default function ModalActivity({ show, handleClose, onSave, actividad }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const {listProjects}= useContext(ProjectContext);

  useEffect(() => {
    if (actividad) {
      reset(actividad);
    } else {
      reset({ idproyecto: '', descripcion: '', time: ''});
    }
  }, [actividad, reset]);

  const onSubmit = (data) => {
    onSave(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{actividad ? 'Editar Actividad' : 'Nueva Actividad'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Actividad</Form.Label>
            <Form.Control
              as="select"
              {...register('idproyecto', { required: 'Elija un proyecto' })}
              isInvalid={!!errors.idproyecto}
            >
              <option value="" disabled>Selecciona un proyecto</option>
              {listProjects.map(project => (
                <option key={project.id} value={project.id}>{project.id}{' - '+project.nombre}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.idproyecto?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              {...register('descripcion', { minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              isInvalid={!!errors.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tiempo dedicado:</Form.Label>
            <Form.Control
              type="number"
              {...register('time', { required: 'Este campo es obligatorio' })}
              isInvalid={!!errors.time}
            />
            <Form.Control.Feedback type="invalid">
              {errors.time?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
