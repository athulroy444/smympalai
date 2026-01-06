import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    // Add your backend validation logic here
    // Get the unit name from the form (this is a simplified example)
    const unitName = e.target.elements.formBasicUnitName.value;

    console.log("Logging in...");

    // Simulate login
    login({ name: unitName, role: 'unit' });

    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="shadow-lg p-4 slide-in-bottom" style={{ width: '400px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3" controlId="formBasicUnitName">
              <Form.Label>Unit Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Unit Name" required className="rounded-pill" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required className="rounded-pill" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3 rounded-pill">
              Login
            </Button>

            <div className="text-center">
              Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;