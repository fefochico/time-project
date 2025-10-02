import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function ModalProyecto({ show, handleClose, onSave, proyecto }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (proyecto) {
      reset(proyecto);
    } else {
      reset({ nombre: '', descripcion: ''});
    }
  }, [proyecto, reset]);

  const onSubmit = (data) => {
    onSave(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{proyecto ? 'Editar Proyecto' : 'Nuevo Proyecto'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              {...register('nombre', { required: 'El nombre es obligatorio', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              {...register('descripcion', { minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              isInvalid={!!errors.apellidos}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
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
