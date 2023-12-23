import React from 'react'
import { Outlet, Link, Navigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Layout = () => {
  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, remove the authToken from localStorage
    localStorage.removeItem('authToken')
    // Redirect user back to the login page
    window.location.href = '/login'
  }

  const isAuthenticated = localStorage.getItem('authToken') !== null

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <Container>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand as={Link} to='/'>
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/transactions'>
              Transactions
            </Nav.Link>
            <Nav.Link as={Link} to='/categories'>
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to='/budgets'>
              Budgets
            </Nav.Link>
            <Nav.Link as={Link} to='/uploads'>
              File Uploads
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container style={{ margin: '20px' }}>
        <Outlet />
      </Container>
    </Container>
  )
}

export default Layout
