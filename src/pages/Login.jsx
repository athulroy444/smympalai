import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [key, setKey] = useState('unit');

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let username = '';
    const password = formData.get('password');
    let role = key;

    if (key === 'unit') username = formData.get('unitName');
    else if (key === 'forona') username = formData.get('foronaName');
    else if (key === 'admin') username = formData.get('adminId');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
        role
      });

      if (response.data.user) {
        login(response.data.user);
        navigate(response.data.user.role === 'unit' ? '/profile' : '/'); // Redirect unit to dashboard
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="shadow-lg p-2 slide-in-bottom" style={{ width: '450px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">SMYM Login</h2>

          <Tabs
            id="login-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-4 justify-content-center nav-pills"
            fill
          >
            <Tab eventKey="unit" title="Unit">
              <Form onSubmit={handleLogin} className="mt-3">
                <Form.Group className="mb-3" controlId="formUnitName">
                  <Form.Label>Unit Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="unitName"
                    placeholder="Enter Unit Name"
                    required
                    className="rounded-pill"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUnitPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" required className="rounded-pill" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3 rounded-pill">
                  Login as Unit
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="forona" title="Forona">
              <Form onSubmit={handleLogin} className="mt-3">
                <Form.Group className="mb-3" controlId="formForonaName">
                  <Form.Label>Forona Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="foronaName"
                    placeholder="Enter Forona Name"
                    required
                    className="rounded-pill"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formForonaPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" required className="rounded-pill" />
                </Form.Group>

                <Button variant="info" type="submit" className="w-100 mb-3 rounded-pill text-white">
                  Login as Forona
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="admin" title="Admin">
              <Form onSubmit={handleLogin} className="mt-3">
                <Form.Group className="mb-3" controlId="formAdminId">
                  <Form.Label>Admin ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="adminId"
                    placeholder="Enter Admin ID"
                    required
                    className="rounded-pill"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAdminPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" required className="rounded-pill" />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100 mb-3 rounded-pill">
                  Login as Admin
                </Button>
              </Form>
            </Tab>
          </Tabs>

          <div className="text-center mt-3">
            {key === 'unit' && (
              <>Don't have a unit account? <Link to="/register" className="text-decoration-none">Register Unit</Link></>
            )}
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;