import { Card } from "react-bootstrap";

export default function ActivityCard({ activity, onClick }) {
    return (   
        <Card onClick={onClick} style={{ cursor: 'pointer', margin: '0.5rem', padding: '0', background: '#4ca571ff' }}>
            <Card.Body>
                <Card.Text>
                    <b>Proyecto:</b> {activity.project} <br/>
                    <b>Tarea:</b> {activity.description} <br/>
                    <b>Horas:</b> {activity.time}
                </Card.Text>
            </Card.Body>
        </Card>

    );
}