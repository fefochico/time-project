import { Modal } from "react-bootstrap";

export default function MyModal({ show, setVisibility, children}) {

  function handleClose(){
    setVisibility(false);
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      {children}
    </Modal>
  );
}