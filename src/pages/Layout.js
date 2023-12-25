import React from 'react';
import { Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Layout = () => {
  const location = useLocation();

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, remove the authToken from localStorage
    localStorage.removeItem('authToken');
    // Redirect user back to the login page
    window.location.href = '/login';
  };

  const isAuthenticated = localStorage.getItem('authToken') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const NavLink = ({ to, children }) => {
    const active = location.pathname === to;
    const linkStyle = active ? {
      borderBottom: '2px solid black',
    } : {
      textDecoration: 'none',
      fontWeight: 'normal',
    }
    return (
      <Nav.Link as={Link} to={to} className={active ? 'active' : ''}>
        <span style={linkStyle}>{children}</span>
      </Nav.Link>
    )
  };

  return (
    <Container>
      <Navbar expand="lg" variant="light" className="mb-4 border-bottom">
        <Navbar.Brand as={Link} to="/">
          <span style={{ fontWeight: 'bold' }}>Budget Manager</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/transactions">Transactions</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/budgets">Budgets</NavLink>
            <NavLink to="/uploads">Upload Transactions</NavLink>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} className="text-muted">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="p-4">
        <Outlet />
      </Container>
    </Container>
  );
};

export default Layout;
