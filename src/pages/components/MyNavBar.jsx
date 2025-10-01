import { Navbar, Nav } from "react-bootstrap";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function MyNavBar() {
  const navigate = useNavigate();

  return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand style={{ color: "white",  paddingLeft: "20px", cursor: "pointer"}} onClick={() => navigate("/home")}>Bienvenido</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ paddingRight: "85px"}}>
            <NavDropdown 
              title="Ajustes"
              id="navbarDropdown"
            >
              <NavDropdown.Item onClick={() => navigate("/home/projects")}>
                Proyectos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=> navigate("/login")}>
                Cerrar sesión
              </NavDropdown.Item>
                            
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}