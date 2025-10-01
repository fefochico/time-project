import { createContext } from "react";

export const ProjectContext = createContext({
    listProjects: [],
    setListProjects: () => {}
});