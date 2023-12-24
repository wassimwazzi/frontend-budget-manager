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

  return (
    <Container>
      <Navbar expand="lg" variant="light" className="mb-4 border-bottom">
        <Navbar.Brand as={Link} to="/" className="font-weight-bold text-primary">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="/transactions"
              className={location.pathname === '/transactions' ? 'active text-primary' : ''}
            >
              Transactions
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/categories"
              className={location.pathname === '/categories' ? 'active text-primary' : ''}
            >
              Categories
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/budgets"
              className={location.pathname === '/budgets' ? 'active text-primary' : ''}
            >
              Budgets
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/uploads"
              className={location.pathname === '/uploads' ? 'active text-primary' : ''}
            >
              File Uploads
            </Nav.Link>
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
