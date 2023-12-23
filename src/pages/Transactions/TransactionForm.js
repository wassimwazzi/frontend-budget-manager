import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button, Alert, InputGroup } from 'react-bootstrap'

const TransactionForm = ({ transactionId, categories, currencies, onUpdate }) => {
  const [formData, setFormData] = useState({
    date: '',
    code: '',
    description: '',
    category: '',
    amount: '',
    currency: ''
  })
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {

    if (transactionId) {
      api
        .get(`/api/transactions/${transactionId}`)
        .then(response => {
          setFormData({
            ...response.data,
            category: response.data.category.id
          })
        })
        .catch(error => {
          console.error('Error fetching transaction data:', error)
        })
    }
  }, [transactionId])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleClear = () => {
    setFormData({
      date: '',
      code: '',
      description: '',
      category: '',
      amount: '',
      currency: ''
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const apiUrl = transactionId
      ? `/api/transactions/${transactionId}/`
      : '/api/transactions/'

    api({
      method: transactionId ? 'put' : 'post',
      url: apiUrl,
      data: formData
    })
      .then(response => {
        const action = transactionId ? 'updated' : 'created'
        setSuccessMessage(`Transasction successfully ${action}!`)
        setErrorMessage(null)
        onUpdate(response.data)
        handleClear()
      })
      .catch(error => {
        setSuccessMessage(null)
        setErrorMessage(error.response.data)
        console.error('Error submitting transaction data:', error.response.data)
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Code:</Form.Label>
        <Form.Control
          type='text'
          name='code'
          value={formData.code}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Category:</Form.Label>
        <Form.Control
          as='select'
          name='category'
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value=''>Select category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <InputGroup className='mb-3'>
        <Form.Group className='mr-3'>
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Currency:</Form.Label>
          <Form.Control
            as='select'
            name='currency'
            value={formData.currency}
            onChange={handleChange}
            required
          >
            <option value=''>Select currency</option>
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </InputGroup>


      {successMessage && (
        <Alert variant='success' className='mt-3'>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant='danger' className='mt-3'>
          {errorMessage}
        </Alert>
      )}

      <div className='mb-3'>
        <Button type='submit' variant='primary'>
          {transactionId ? 'Update' : 'Create'}
        </Button>
        <Button
          type='button'
          onClick={handleClear}
          variant='secondary'
          className='ml-2'
        >
          Clear
        </Button>
      </div>
    </Form>
  )
}

export default TransactionForm
