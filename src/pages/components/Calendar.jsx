import { useEffect, useState } from "react";
import { useContext } from "react";
import { DateContext } from "../contexts/DateContext";
import ActivityCard from "./ActivityCard";
import ModalForm from "./ModalForm";
import { ActivityContext } from "../contexts/ActivityContext";

export default function Calendar() {
    const {fecha} = useContext(DateContext);

    const [datesOfWeeks, setDaysOfWeeks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activity, setActivity] = useState(null);
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const {listActivities} = useContext(ActivityContext);

    function setVisibilityModal(activity = null){
      if(activity && (activity.project && activity.description && activity.time || activity.date)){
        setActivity(activity);
      }
      setShowModal(!showModal);
    }

    function getStringDate(date) {
        if(!(date instanceof Date)) return "";
        return (
            date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
        ) + '/' + (
            (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        ) + '/' + date.getFullYear();
    }

    useEffect(() => {
        // 1. Array de los días de la semana en el orden deseado (ej: Lunes a Domingo)
        // [1, 2, 3, 4, 5, 6, 0] -> Lunes=1, Martes=2, ..., Domingo=0
        const weekDaysOrder = [1, 2, 3, 4, 5, 6, 0];
        
        const currentDayOfWeek = fecha.getDay(); 

        const dates = weekDaysOrder.map((day) => {
            const date = new Date(fecha); 
            
            const dayDifference = currentDayOfWeek - day;
            
            date.setDate(fecha.getDate() - dayDifference);
            
            const isSelected = date.getDate() === fecha.getDate() && 
                               date.getMonth() === fecha.getMonth() && 
                               date.getFullYear() === fecha.getFullYear();
            
            return {
                selected: isSelected,
                date: getStringDate(date)
            };
        });
        
        setDaysOfWeeks(dates);
    }, [fecha]);



    return (
        <div className="calendar-container">
            { daysOfWeek.map((day, index) => (
                <div key={day} className="columnDay-header" style={{ background: datesOfWeeks[index] && datesOfWeeks[index].selected ? "#646cff" : "transparent" }}>
                    {day}
                    <br/>
                    {datesOfWeeks[index] && datesOfWeeks[index].date}
                </div>
            ))}
            <div className="calendar-content-row">
              { daysOfWeek.map((day, index) => (
                  <div key={day} className="columnDay">
                      { listActivities.filter(activity => activity.date === datesOfWeeks[index].date).map(activity => (
                          <ActivityCard key={activity.id} activity={activity} onClick={() => setVisibilityModal(activity)}/>
                      ))}
                      <button className="btn btn-primary" style={{ width: "calc(100% - 1rem)", margin: "0.5rem" }} onClick={() => setVisibilityModal({date: datesOfWeeks[index].date})}>+ Añadir</button>
                  </div>
              ))}
            </div>
            { daysOfWeek.map((day, index) => (
                <div key={day} className="columnDay-header">
                    Total: {listActivities.filter(activity => activity.date === datesOfWeeks[index].date).reduce((sum, activity) => Number(sum) + Number(activity.time), 0)} h
                </div>
            ))}
            <ModalForm showModal={showModal} setShowModal={setVisibilityModal} activity={activity} setActivity={setActivity}/>
        </div>
  );
}