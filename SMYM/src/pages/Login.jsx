import React, { useState } from 'react';
import { Button, Form, Container, Card, Tabs, Tab, Spinner, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Person, Lock, ShieldLock, Building, People } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // States
  const [key, setKey] = useState('unit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const password = formData.get('password');
    const role = key;

    // Logic to pick the correct identifier based on active tab
    let username = "";
    if (key === 'unit') username = formData.get('unitName');
    else if (key === 'forona') username = formData.get('foronaName');
    else if (key === 'admin') username = formData.get('adminId');

    // API Call
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username: username.trim(), // Remove accidental spaces
        password,
        role
      });

      if (response.data.user) {
        login(response.data.user);
        // Successful redirect
        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (response.data.user.role === 'unit' || response.data.user.role === 'forona') {
          navigate('/profile');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Capture detailed error messages from backend
      const errMsg = err.response?.data?.message || "Server connection failed. Please check if the backend is running.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", background: '#f4f7f6' }}>
      <style>{`
        .login-card { border: none; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); overflow: hidden; }
        .nav-pills .nav-link { color: #6c757d; font-weight: 600; border-radius: 10px; margin: 0 5px; }
        .nav-pills .nav-link.active { background-color: #0d6efd !important; box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2); }
        .form-control { border-radius: 10px; padding: 12px 15px; border: 1px solid #e1e5eb; }
        .form-control:focus { border-color: #0d6efd; box-shadow: none; }
        .login-btn { border-radius: 10px; padding: 12px; font-weight: 700; letter-spacing: 0.5px; transition: all 0.3s; }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      `}</style>

      <Card className="login-card" style={{ width: '450px' }}>
        <div className="bg-primary p-4 text-center text-white">
          <h3 className="fw-bold mb-1">SMYM Portal</h3>
          <p className="small opacity-75 mb-0">Eparchy of Palai • Syndicate Login</p>
        </div>

        <Card.Body className="p-4">
          {error && <Alert variant="danger" className="py-2 small text-center rounded-3">{error}</Alert>}

          <Tabs
            id="login-tabs"
            activeKey={key}
            onSelect={(k) => { setKey(k); setError(null); }}
            className="mb-4 justify-content-center nav-pills"
            fill
          >
            <Tab eventKey="unit" title={<><Building className="me-1" /> Unit</>}>
              <LoginForm
                label="Unit Name"
                name="unitName"
                placeholder="Enter Parish Name"
                loading={loading}
                onSubmit={handleLogin}
                btnVariant="primary"
              />
            </Tab>

            <Tab eventKey="forona" title={<><People className="me-1" /> Forona</>}>
              <LoginForm
                label="Forona Name"
                name="foronaName"
                placeholder="Enter Forona Name"
                loading={loading}
                onSubmit={handleLogin}
                btnVariant="info"
              />
            </Tab>

            <Tab eventKey="admin" title={<><ShieldLock className="me-1" /> Admin</>}>
              <LoginForm
                label="Admin ID"
                name="adminId"
                placeholder="Enter Administrator ID"
                loading={loading}
                onSubmit={handleLogin}
                btnVariant="dark"
              />
            </Tab>
          </Tabs>

          <div className="text-center mt-3">
            {key === 'unit' && (
              <span className="text-muted small">
                New Unit? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create Account</Link>
              </span>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

// Sub-component for clean code
const LoginForm = ({ label, name, placeholder, loading, onSubmit, btnVariant }) => (
  <Form onSubmit={onSubmit} className="mt-2">
    <Form.Group className="mb-3">
      <Form.Label className="small fw-bold text-muted">{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text className="bg-light border-end-0"><Person size={18} className="text-muted" /></InputGroup.Text>
        <Form.Control
          className="border-start-0"
          type="text"
          name={name}
          placeholder={placeholder}
          required
          disabled={loading}
        />
      </InputGroup>
    </Form.Group>

    <Form.Group className="mb-4">
      <Form.Label className="small fw-bold text-muted">Password</Form.Label>
      <InputGroup>
        <InputGroup.Text className="bg-light border-end-0"><Lock size={18} className="text-muted" /></InputGroup.Text>
        <Form.Control
          className="border-start-0"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          disabled={loading}
        />
      </InputGroup>
    </Form.Group>

    <Button variant={btnVariant} type="submit" className="w-100 login-btn shadow-sm" disabled={loading}>
      {loading ? <Spinner animation="border" size="sm" className="me-2" /> : `Sign in as ${label.split(' ')[0]}`}
    </Button>
  </Form>
);

export default Login;