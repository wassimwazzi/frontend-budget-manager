import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post('/api/token/', formData)
      .then(response => {
        localStorage.setItem('authToken', response.data.token)
        window.location.href = '/'
      })
      .catch(error => {
        console.error('Error:', error)
        // Display error message to user
      })
  }

  return (
    <Container className='mt-4'>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-2'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Login
