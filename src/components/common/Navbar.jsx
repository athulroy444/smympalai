import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import smymLogo from "../../assets/NavLogo.png";
import { PersonCircle, BoxArrowRight, People } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <TopBar />
      <Navbar expand="lg" className="sticky-top bg-white shadow-sm" style={{ padding: '15px 0' }}>
        <Container>
          {/* ... (Keep brand logo code) */}

          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={smymLogo}
              width="50"
              height="50"
              className="d-inline-block align-top rounded-circle me-3"
              alt="SMYM Logo"
            />
            <div className="d-flex flex-column">
              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#E14B1F' }}>SMYM</span>
              <span style={{ fontSize: '0.85rem', color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '1px' }}>Eparchy of Palai</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 fw-bold text-uppercase"
              style={{ fontSize: '0.9rem', gap: '15px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>

              <NavDropdown title="About Us" id="about-dropdown">
                <NavDropdown.Item as={Link} to="/about">History</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about">Director</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about">Team</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Activities" id="activities-dropdown">
                <NavDropdown.Item as={Link} to="/activities">Events</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/activities">Camps</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/activities">Social Service</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Forona" id="forona-dropdown">
                <NavDropdown.Item as={Link} to="/forona">Find Unit</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/forona-executives">Manage Executives</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
            </Nav>

            {user ? (
              <Link to="/profile" className="ms-3 text-primary d-flex align-items-center" style={{ textDecoration: 'none' }}>
                <PersonCircle size={32} />
              </Link>
            ) : (
              <Link to="/login" className="ms-3">
                <Button variant="primary" size="sm">Login</Button>
              </Link>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;