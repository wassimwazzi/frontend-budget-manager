import api from '../../api'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
  })
  const [confirmMatch, setConfirmMatch] = useState(true)
  const [passwordLengthValid, setPasswordLengthValid] = useState(true)
  const [passwordContainsNumber, setPasswordContainsNumber] = useState(true)
  const [passwordContainsSpecial, setPasswordContainsSpecial] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    setPasswordValid(passwordLengthValid && passwordContainsNumber && passwordContainsSpecial)
  }, [passwordLengthValid, passwordContainsNumber, passwordContainsSpecial])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleConfirmChange = e => {
    handleChange(e)
    setConfirmMatch(e.target.value === formData.password)
  }

  const handlePasswordChange = e => {
    handleChange(e)
    setPasswordLengthValid(e.target.value.length >= 8)
    setPasswordContainsNumber(/\d/.test(e.target.value))
    setPasswordContainsSpecial(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(e.target.value))
    setConfirmMatch(e.target.value === formData.confirm_password)
  }

  const handleSubmit = e => {
    e.preventDefault()

    api
      .post('/signup/', formData)
      .then(response => {
        window.location.href = '/login'
      })
      .catch(error => {
        console.error('Error:', error.response)
        if (error.response.status === 400) {
          for (const [key, value] of Object.entries(error.response.data)) {
            setErrorMessages(prevMessages => [...prevMessages, `${key}: ${value}`])
          }
        } else {
          setErrorMessages(['Error creating account. Please try again later.'])
        }
      })
  }

  return (
    <Container className='mt-4'>
      <h1>Sign Up</h1>
      {errorMessages.length > 0 &&
        <Alert variant="danger">
          <ul>
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </Alert>
      }
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='first_name' className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='last_name' className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Enter an email address to be able to reset your password.
          </Form.Text>
        </Form.Group>
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
            onChange={handlePasswordChange}
            isInvalid={!passwordValid}
            required
          />
          <Form.Control.Feedback type='invalid' className='mb-3'>
            <ul>
              {!passwordLengthValid && <li>Password must be at least 8 characters long.</li>}
              {!passwordContainsNumber && <li>Password must contain at least one number.</li>}
              {!passwordContainsSpecial && <li>Password must contain at least one special character.</li>}
            </ul>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='confirm_password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirm_password'
            value={formData.confirm_password}
            onChange={handleConfirmChange}
            isInvalid={!confirmMatch}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Passwords must match.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-2' disabled={!confirmMatch}>
          Submit
        </Button>
        <Button variant='secondary' className='mt-2 ms-2' href='/login'>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp
