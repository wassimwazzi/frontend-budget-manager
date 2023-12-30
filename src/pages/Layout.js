import { Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

const Layout = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const isAuthenticated = localStorage.getItem('authToken') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getUserName = () => {
    return localStorage.getItem('username');
  };

  const NavLink = ({ to, children }) => {
    const active = location.pathname === to;
    const linkStyle = active
      ? {
        borderBottom: '2px solid black',
        fontWeight: 'bold',
      }
      : {
        textDecoration: 'none',
        fontWeight: 'normal',
      };
    return (
      <Nav.Link as={Link} to={to} className={active ? 'active' : ''}>
        <span style={linkStyle}>{children}</span>
      </Nav.Link>
    );
  };

  return (
    <Container>
      <Navbar expand="lg" variant="light" className="mb-4 border-bottom">
        <Navbar.Brand as={Link} to="/">
          <img
            src={`${process.env.PUBLIC_URL}/favicon.ico`}
            alt="App Icon"
            style={{ height: '5rem' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/transactions">Transactions</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/budgets">Budgets</NavLink>
            <NavLink to="/uploads">Upload Transactions</NavLink>
            <NavLink to="/goals">Goals</NavLink>
          </Nav>
          <Nav>
            <Dropdown
              className='me-4 pe-4'
            >
              <Dropdown.Toggle variant="link">
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item disabled>{getUserName()}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
