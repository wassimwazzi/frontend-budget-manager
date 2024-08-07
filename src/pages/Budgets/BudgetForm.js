import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { getCurrentMonth } from '../../utils/dateUtils'
import { useStatus } from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'

const BudgetForm = ({ budgetId, categories, currencies, onSubmit, onClear }) => {
    const initialFormData = Object.freeze({
        amount: '',
        currency: '',
        start_date: getCurrentMonth(),
        category: '',
    })
    const [formData, setFormData] = useState(initialFormData)
    const { showStatus } = useStatus()

    useEffect(() => {
        if (budgetId) {
            api
                .get(`/api/budgets/${budgetId}`)
                .then(response => {
                    setFormData({
                        ...response.data,
                        category: response.data.category.id,
                        start_date: response.data.start_date.substring(0, 7) // YYYY-MM
                    })
                })
                .catch(error => {
                    console.error('Error fetching budget data:', error.response)
                })
        }
    }, [budgetId])

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleClear = () => {
        setFormData(initialFormData)
        showStatus('', '')
        onClear()
    }

    const handleSubmit = e => {
        e.preventDefault()
        showStatus('', '')

        const apiUrl = budgetId
            ? `/api/budgets/${budgetId}/`
            : '/api/budgets/'
        formData.start_date += '-01'

        api({
            method: budgetId ? 'put' : 'post',
            url: apiUrl,
            data: formData
        })
            .then(response => {
                const action = budgetId ? 'updated' : 'created'
                onSubmit(response.data)
                handleClear()
                showStatus(`Budget successfully ${action}!`, 'success')

            })
            .catch(error => {
                const errorMessage = extractErrorMessageFromResponse(error, formData, 'Error submitting budget data. Make sure you have not already created a budget for this month.')
                showStatus(errorMessage, 'error')
                console.error('Error submitting budget data:', error.response?.data)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className='mb-3'>
                <Form.Label>Start Month</Form.Label>
                <FormControl
                    type='month'
                    name='start_date'
                    value={formData.start_date}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Category:</Form.Label>
                <Form.Select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value=''>Select category</option>
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.category}
                            </option>
                        ))
                    }
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

            <div className='mb-3'>
                <Button type='submit' variant='primary'>
                    {budgetId ? 'Update' : 'Create'}
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
        </Form >
    )
}

export default BudgetForm
