import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const { foronaList } = useData();
    const [unitName, setUnitName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [foronaId, setForonaId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!foronaId) {
            setError("Please select a Forona");
            return;
        }

        setLoading(true);

        try {
            console.log("Attempting registration with:", {
                username: unitName,
                password,
                role: 'unit',
                entityId: parseInt(foronaId)
            });
            // 1. Register logic
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                username: unitName,
                password,
                role: 'unit',
                entityId: parseInt(foronaId)
            });
            console.log("Registration Response:", response.data);

            alert("Registration Successful! Please login.");
            navigate('/login');
        } catch (err) {
            console.error("Full Registration Error:", err);
            const backendMessage = err.response?.data?.message;
            const networkError = !err.response ? "Network error. Please check if the backend is running on port 5000." : null;
            setError(backendMessage || networkError || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", background: '#f8f9fa' }}>
            <Card className="shadow p-4" style={{ width: '500px', borderRadius: '20px', border: 'none' }}>
                <Card.Body>
                    <h2 className="text-center mb-4 fw-bold">Unit Registration</h2>

                    {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Select Forona</Form.Label>
                            <Form.Select
                                value={foronaId}
                                onChange={(e) => setForonaId(e.target.value)}
                                required
                                className="rounded-3"
                            >
                                <option value="">-- Choose Forona --</option>
                                {foronaList.map(f => (
                                    <option key={f.id} value={f.id}>{f.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Unit Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Cathedral Unit"
                                value={unitName}
                                onChange={(e) => setUnitName(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold">Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3 rounded-3 py-2 fw-bold" disabled={loading} style={{ backgroundColor: '#E14B1F', border: 'none' }}>
                            {loading ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Creating Account...</>
                            ) : 'Register Unit'}
                        </Button>

                        <div className="text-center">
                            Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;
