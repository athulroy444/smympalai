import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PageHeader from '../components/common/PageHeader';
import { CalendarEvent, People, Heart } from 'react-bootstrap-icons';

import { useData } from '../context/DataContext';

function Activities() {
    const { activities } = useData();

    // Map icon names to components if needed, or just use defaults for now
    // For simplicity, we'll re-use the same icons or switch based on name
    const getIcon = (iconName) => {
        if (iconName === 'Heart') return <Heart size={30} />;
        if (iconName === 'CalendarEvent') return <CalendarEvent size={30} />;
        return <People size={30} />; // Default
    };

    return (
        <>
            <PageHeader title="Our Activities" subtitle="Faith in action through service and fellowship." />

            <Container className="py-5">
                <Row>
                    {activities.length === 0 ? (
                        <div className="text-center">Loading activities or none found...</div>
                    ) : (
                        activities.map((act, idx) => (
                            <Col key={idx} md={4} className="mb-4">
                                <Card className="h-100 border-0 shadow-sm text-center p-4">
                                    <Card.Body>
                                        <div className="text-primary mb-3">{getIcon(act.icon_name)}</div>
                                        <Card.Title className="fw-bold mb-3">{act.title}</Card.Title>
                                        <Card.Text className="text-muted">{act.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    );
}

export default Activities;
