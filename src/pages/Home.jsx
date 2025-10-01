import MyNavBar from "./components/MyNavBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ProjectContext } from "./contexts/ProjectContext";
export default function Home() {
  const [listProjects, setListProjects] = useState([]);
  return (
    <>
      <ProjectContext.Provider value={{listProjects, setListProjects}}>
        <MyNavBar/>
        <Outlet/>
      </ProjectContext.Provider>
    </>

  );
}
