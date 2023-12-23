import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button, Alert } from 'react-bootstrap'

const CategoryForm = ({ categoryId, onUpdate }) => {
    const initialFormData = Object.freeze({
        income: false,
        category: '',
        description: '',
    })
    const [formData, setFormData] = useState(initialFormData)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {

        if (categoryId) {
            api
                .get(`/api/categories/${categoryId}`)
                .then(response => {
                    setFormData(response.data)
                })
                .catch(error => {
                    console.error('Error fetching category data:', error)
                })
        }
    }, [categoryId])

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleClear = () => {
        setFormData(initialFormData)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const apiUrl = categoryId
            ? `/api/categories/${categoryId}/`
            : '/api/categories/'

        api({
            method: categoryId ? 'put' : 'post',
            url: apiUrl,
            data: formData
        })
            .then(response => {
                const action = categoryId ? 'updated' : 'created'
                setSuccessMessage(`Category successfully ${action}!`)
                setErrorMessage(null)
                onUpdate(response.data)
                handleClear()
            })
            .catch(error => {
                setSuccessMessage(null)
                setErrorMessage('Error submitting category data')
                console.error('Error submitting category data:', error.response.data)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className='mb-3'>
                <Form.Label>Category:</Form.Label>
                <Form.Control
                    type='text'
                    name='category'
                    value={formData.category}
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
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Check
                    type='switch'
                    label='Income'
                    checked={formData.income}
                    onChange={handleChange}
                />
            </Form.Group>

            {
                successMessage && (
                    <Alert variant='success' className='mt-3'>
                        {successMessage}
                    </Alert>
                )
            }

            {
                errorMessage && (
                    <Alert variant='danger' className='mt-3'>
                        {errorMessage}
                    </Alert>
                )
            }

            <div className='mb-3'>
                <Button type='submit' variant='primary'>
                    {categoryId ? 'Update' : 'Create'}
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
        </Form >
    )
}

export default CategoryForm
