import { nonAuthenticatedApi as api } from '../../api'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { useStatus } from '../../components/Status'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { showStatus } = useStatus()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    api
      .post('/api/token/', formData)
      .then(response => {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('username', formData.username)
        window.location.href = '/'
      })
      .catch(error => {
        console.error('Error:', error.response)
        showStatus('Invalid username password combination', 'error')
      })
  }

  return (
    <Container className='mt-4'>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username' className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-2'>
          Submit
        </Button>
        <Button variant='secondary' className='mt-2 ms-2' href='/signup'>
          Sign Up
        </Button>
      </Form>
    </Container>
  )
}

export default Login
