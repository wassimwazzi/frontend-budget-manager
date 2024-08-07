import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button, InputGroup, Modal } from 'react-bootstrap'
import { getCurrentDay } from '../../utils/dateUtils'
import { useStatus } from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import CategoryForm from '../Categories/CategoryForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

const TransactionForm = ({ transactionId, categories, currencies, onSubmit, onClear }) => {
  const initialFormData = {
    date: getCurrentDay(),
    code: '',
    description: '',
    category: '',
    amount: '',
    currency: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const { showStatus } = useStatus()

  const CategoryFormModal = () => {
    const handleConfirm = (data) => {
      if (!data) {
        return
      }
      setShowCategoryForm(false)
      showStatus('Category successfully created!', 'success')
      categories.push(data)
      handleChange({ target: { name: 'category', value: data.id } })
    }
    const handleClose = () => {
      setShowCategoryForm(false)
    }
    return (
      <Modal
        show={showCategoryForm}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm onSubmit={handleConfirm} />
        </Modal.Body>
      </Modal>)

  }

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
    setFormData(initialFormData)
    onClear()
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!formData.description && !formData.code) {
      showStatus('Please enter a description or code.', 'error')
      return
    }
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
        handleClear()
        showStatus(`Transasction successfully ${action}!`, 'success')
        onSubmit(response.data)
      })
      .catch(error => {
        showStatus(extractErrorMessageFromResponse(error, formData), 'error')
        console.error('Error submitting transaction data:', error.response)
      })
  }

  return (
    <>
      <CategoryFormModal />
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
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category:</Form.Label>
          <div style={{ display: 'flex' }}>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{ flex: 1, marginRight: '10px' }}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </Form.Select>
            <div style={{ flex: '1' }} className='ps-5'>
              <FontAwesomeIcon
                icon={faSquarePlus}
                onClick={() => setShowCategoryForm(true)}
                size="2x"
                style={{ cursor: 'pointer', flex: 1 }}
              />
            </div>
          </div>
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

        <div className='mb-3'>
          <Button type='submit' variant='primary'>
            {transactionId ? 'Update' : 'Create'}
          </Button>
          {!transactionId && <Button
            type='button'
            onClick={handleClear}
            variant='secondary'
            className='ms-2'
          >
            Clear
          </Button>}
        </div>
        {transactionId && formData.inferred_category && (
          <div className='mb-3'>
            <Form.Text className='text-muted'>
              <b>NOTE:</b> Updating a transaction set inferred category to false
            </Form.Text>
          </div>
        )}
      </Form>
    </>
  )
}

export default TransactionForm
