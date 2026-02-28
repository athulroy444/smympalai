import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import smymLogo from "../../assets/NavLogo.png";
import { PersonCircle, People, Search } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

function AppNavbar() {
  const { user, logout } = useAuth();
  const { foronaList, siteSettings } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <TopBar />
      <Navbar expand="lg" className="sticky-top glass-navbar" style={{ padding: '15px 0' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={smymLogo}
              width="45"
              height="45"
              className="d-inline-block align-top rounded-circle me-2 me-md-3 brand-logo"
              alt="SMYM Logo"
            />
            <div className="d-flex flex-column brand-text">
              <span className="brand-name" style={{ fontWeight: 800, fontSize: '1.2rem', color: '#E14B1F', lineHeight: 1.1 }}>
                {siteSettings.site_title || "SMYM"}
              </span>
              <span className="brand-sub" style={{ fontSize: '0.75rem', color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Eparchy of Palai</span>
            </div>
          </Navbar.Brand>

          <style>{`
            @media (max-width: 380px) {
              .brand-sub { font-size: 0.65rem !important; }
              .brand-name { font-size: 1rem !important; }
              .brand-logo { width: 35px !important; height: 35px !important; }
            }
            .nav-link-custom {
              position: relative;
              padding: 0.5rem 0.8rem !important;
              transition: color 0.3s ease;
            }
            .nav-link-custom::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 0;
              height: 2px;
              background: #E14B1F;
              transition: all 0.3s ease;
              transform: translateX(-50%);
            }
            .nav-link-custom:hover::after {
                width: 70%;
            }
            .forana-scroll-menu {
              max-height: 400px;
              overflow-y: auto;
              min-width: 220px;
            }
          `}</style>

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

              <NavDropdown title="Forana" id="forona-dropdown">
                <div className="forana-scroll-menu">
                  <NavDropdown.Item as={Link} to="/forona" style={{ color: '#E14B1F', fontWeight: 'bold' }} className="border-bottom py-2 d-flex align-items-center">
                    <Search size={16} className="me-2" /> Browse Units
                  </NavDropdown.Item>

                  <NavDropdown.Header className="text-muted small fw-bold mt-2">Explore Foronas</NavDropdown.Header>
                  {foronaList && foronaList.map((forona, index) => (
                    <NavDropdown.Item
                      key={index}
                      as={Link}
                      to={`/forona?name=${encodeURIComponent(forona.name)}`}
                      style={{ fontSize: '0.85rem', textTransform: 'capitalize' }}
                    >
                      {forona.name}
                    </NavDropdown.Item>
                  ))}

                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/forona-executives" style={{ fontSize: '0.85rem' }}>
                    <People size={14} className="me-2" /> Manage Executives
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center ms-lg-3">
              {user ? (
                <NavDropdown
                  title={<PersonCircle size={28} className="text-primary" />}
                  id="user-nav-dropdown"
                  align="end"
                >
                  {user.role === 'admin' && (
                    <NavDropdown.Item as={Link} to="/admin-dashboard" className="text-primary fw-bold">
                      Admin Dashboard
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="sm" className="px-3 rounded-pill fw-bold" style={{ backgroundColor: '#E14B1F', border: 'none' }}>
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;