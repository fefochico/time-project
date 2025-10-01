
import Calendar from "./components/Calendar";
import FormFilter from "./components/FormFilter";
import { useState } from "react";
import { DateContext } from "./contexts/DateContext";
import { ActivityContext } from "./contexts/ActivityContext";

export default function Tasks() {
    const [fecha, setFecha] = useState(new Date());
    const [listActivities, setListActivities] = useState([]);
  
    return(
    <DateContext.Provider value={{ fecha, setFecha }}>
        <FormFilter/>
        <ActivityContext.Provider value={{ listActivities, setListActivities }}>
            <Calendar/>
        </ActivityContext.Provider>
    </DateContext.Provider>)
}