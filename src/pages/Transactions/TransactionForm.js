import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { getCurrentDay } from '../../utils/dateUtils'
import Status from '../../components/Status'

const TransactionForm = ({ transactionId, categories, currencies, onUpdate }) => {
  const [formData, setFormData] = useState({
    date: getCurrentDay(),
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
          console.error('Error fetching transaction data:', error.response)
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
    setSuccessMessage(null)
    setErrorMessage(null)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

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
        onUpdate(response.data)
        handleClear()
      })
      .catch(error => {
        if (error.response.status === 400) {
          // make error message bullet list
          let errorMessage = ''
          for (const key in error.response.data) {
            errorMessage += `${key}: ${error.response.data[key]}\n`
          }
          setErrorMessage(errorMessage)
        }
        else {
          setErrorMessage('An error occurred. Please try again later.')
        }
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
        <Form.Select
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
        </Form.Select>
      </Form.Group>

      <InputGroup className='mb-3'>
        <Form.Group className='me-3'>
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
          <Form.Select
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
          </Form.Select>
        </Form.Group>
      </InputGroup>

      <Status
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <div className='mb-3'>
        <Button type='submit' variant='primary'>
          {transactionId ? 'Update' : 'Create'}
        </Button>
        <Button
          type='button'
          onClick={handleClear}
          variant='secondary'
          className='ms-2'
        >
          Clear
        </Button>
      </div>
    </Form>
  )
}

export default TransactionForm
