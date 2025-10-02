import { Navbar, Nav } from "react-bootstrap";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function MyNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate("/login");
  };

  return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand className="custom-brand-navbar" onClick={() => navigate("/home")}>Bienvenido</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ paddingRight: "135px"}}>
            <NavDropdown 
              id="navbarDropdown"
              className="svg-dropdown-toggle"
              title={
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="currentColor" 
                        className="bi bi-sliders" 
                        viewBox="0 0 16 16"
                    >
                        <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
                    </svg>
                }
            >
              <NavDropdown.Item onClick={() => navigate("/home/projects")}>
                Proyectos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=> handleLogout()}>
                Cerrar sesión
              </NavDropdown.Item>
                            
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}