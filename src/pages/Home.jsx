import Calendar from "./components/Calendar";
import FormFilter from "./components/FormFilter";
import { useState } from "react";
import { DateContext } from "./contexts/DateContext";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Logout from "./components/Logout";
import { ActivityContext } from "./contexts/ActivityContext";
export default function Home() {
  const [fecha, setFecha] = useState(new Date());
  const [listActivities, setListActivities] = useState([]);
  
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand style={{ color: "white",  paddingLeft: "20px"}}>Bienvenido</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ paddingRight: "20px"}}>
            <Logout/>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
      <DateContext.Provider value={{ fecha, setFecha }}>
        <FormFilter/>
        <ActivityContext.Provider value={{ listActivities, setListActivities }}>
          <Calendar/>
        </ActivityContext.Provider>
      </DateContext.Provider>
    </>

  );
}
