import { Card } from "react-bootstrap";
import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

export default function ActivityCard({ activity, onClick }) {
    const {listProjects} = useContext(ProjectContext);

    return (   
        <Card onClick={onClick} className="activity-card" >
            <Card.Body>
                <Card.Text>
                    <b>Proyecto:</b> {activity.project}{' - '+ listProjects.find(v=> v.id===activity.project).name}<br/>
                    {activity.description && (
                        <>
                            <b>Tarea:</b> {activity.description} <br/>
                        </>
                    )}
                    <b>Horas:</b> {activity.time}
                </Card.Text>
            </Card.Body>
        </Card>

    );
}