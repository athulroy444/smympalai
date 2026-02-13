import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext';

function Register() {
    const navigate = useNavigate();
    const { registerUnit } = useData();
    const [unitName, setUnitName] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        // Register the unit using the context (forona is temporarily null as per request)
        registerUnit(null, unitName, []);

        console.log("Registered:", { unitName });
        alert("Registration Successful!");
        navigate('/forona'); // Redirect to search page to see the result
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card className="shadow-lg p-4 slide-in-bottom" style={{ width: '500px', borderRadius: '15px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4 text-primary">Unit Registration</h2>
                    <Form onSubmit={handleRegister}>

                        <Form.Group className="mb-3" controlId="formBasicUnitName">
                            <Form.Label>Unit Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Unit Name"
                                value={unitName}
                                onChange={(e) => setUnitName(e.target.value)}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required className="rounded-pill" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" required className="rounded-pill" />
                        </Form.Group>



                        <Button variant="primary" type="submit" className="w-100 mb-3 rounded-pill">
                            Register
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
