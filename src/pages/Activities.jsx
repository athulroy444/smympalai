import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PageHeader from '../components/common/PageHeader';
import { CalendarEvent, People, Heart } from 'react-bootstrap-icons';

function Activities() {
    const activities = [
        {
            title: "Youth Camps",
            icon: <People size={30} />,
            desc: "Annual leadership and spiritual camps designed to mold the character of our youth."
        },
        {
            title: "Social Service",
            icon: <Heart size={30} />,
            desc: "Charity drives, blood donation camps, and housing projects for the needy."
        },
        {
            title: "Cultural Events",
            icon: <CalendarEvent size={30} />,
            desc: "Arts festivals and sports tournaments to foster unity and talent."
        }
    ];

    return (
        <>
            <PageHeader title="Our Activities" subtitle="Faith in action through service and fellowship." />

            <Container className="py-5">
                <Row>
                    {activities.map((act, idx) => (
                        <Col key={idx} md={4} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm text-center p-4">
                                <Card.Body>
                                    <div className="text-primary mb-3">{act.icon}</div>
                                    <Card.Title className="fw-bold mb-3">{act.title}</Card.Title>
                                    <Card.Text className="text-muted">{act.desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Activities;
