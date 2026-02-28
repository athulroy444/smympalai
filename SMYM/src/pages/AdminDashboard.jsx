import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import {
    People,
    PersonBadge,
    CalendarEvent,
    Building,
    Gear,
    GraphUp,
    BoxArrowRight,
    ArrowRight
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const adminActions = [
        {
            title: 'Manage Executives',
            description: 'Update Forona and Unit level executive details, photos and positions.',
            icon: <PersonBadge size={30} />,
            link: '/forona-executives',
            color: '#0d6efd'
        },
        {
            title: 'Event Management',
            description: 'Create and manage upcoming events, registrations and attendance.',
            icon: <CalendarEvent size={30} />,
            link: '/activities',
            color: '#198754'
        },
        {
            title: 'Unit Directory',
            description: 'View and manage all registered units across different Foronas.',
            icon: <Building size={30} />,
            link: '/forona',
            color: '#6f42c1'
        },
        {
            title: 'Member Directory',
            description: 'View and manage all registered members across different Foronas and Units.',
            icon: <People size={30} />,
            link: '/admin/member-directory',
            color: '#fd7e14'
        },
        {
            title: 'User Settings',
            description: 'Manage admin accounts, permissions and system configurations.',
            icon: <Gear size={30} />,
            link: '#',
            color: '#6c757d'
        }
    ];

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '3rem' }}>
            <style>{`
                .admin-card {
                    transition: all 0.3s ease;
                    border: none;
                    border-radius: 15px;
                    overflow: hidden;
                }
                .admin-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
                }
                .icon-box {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                }
                .action-link {
                    text-decoration: none;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: gap 0.2s;
                }
                .admin-card:hover .action-link {
                    gap: 10px;
                }
            `}</style>

            <PageHeader
                title="Admin Dashboard"
                subtitle="Welcome back, Administrator. Control center for SMYM Palai."
            />

            <Container className="mt-n5">
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow-sm border-0 p-3" style={{ borderRadius: '15px', marginTop: '-30px' }}>
                            <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white p-3 rounded-circle me-3">
                                        <People size={24} />
                                    </div>
                                    <div>
                                        <h5 className="mb-0 fw-bold">Active Session: {user?.name || 'Administrator'}</h5>
                                        <Badge bg="success-subtle" className="text-success border border-success-subtle mt-1 uppercase">
                                            Super Admin Access
                                        </Badge>
                                    </div>
                                </div>
                                <Button variant="outline-danger" onClick={handleLogout} className="px-4 fw-bold">
                                    <BoxArrowRight className="me-2" /> Sign Out
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <h4 className="fw-bold mb-4 mt-5">Quick Management</h4>
                <Row>
                    {adminActions.map((action, idx) => (
                        <Col lg={4} md={6} key={idx} className="mb-4">
                            <Card className="h-100 shadow-sm admin-card">
                                <Card.Body className="p-4">
                                    <div className="icon-box" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                                        {action.icon}
                                    </div>
                                    <h5 className="fw-bold mb-3">{action.title === 'Member Directory' ? 'Executive Directory' : action.title}</h5>
                                    <p className="text-muted small mb-4" style={{ lineHeight: '1.6' }}>
                                        {action.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Button
                                            variant="link"
                                            className="action-link p-0"
                                            style={{ color: action.color }}
                                            onClick={() => action.link !== '#' && navigate(action.link)}
                                        >
                                            Go to Module <ArrowRight />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <h4 className="fw-bold mb-4 mt-4">System Overview</h4>
                <Row>
                    <Col md={8}>
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
                            <Card.Header className="bg-white border-bottom py-3">
                                <h6 className="mb-0 fw-bold">Recent Activities</h6>
                            </Card.Header>
                            <Card.Body>
                                <div className="text-center py-5 text-muted">
                                    <p className="mb-0">Activity log integration coming soon...</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)', color: 'white' }}>
                            <Card.Body className="p-4 d-flex flex-column justify-content-center text-center">
                                <h3 className="fw-bold mb-2">Total Executives</h3>
                                <h1 className="display-4 fw-bold mb-4">52</h1>
                                <p className="opacity-75 small">Office bearers across all levels in the Eparchy of Palai.</p>
                                <Button
                                    variant="light"
                                    className="mt-3 fw-bold text-primary py-2"
                                    onClick={() => navigate('/admin/member-directory')}
                                >
                                    View Analytics
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminDashboard;
