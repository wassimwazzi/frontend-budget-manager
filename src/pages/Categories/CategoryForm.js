import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button } from 'react-bootstrap'
import Status from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'

const CategoryForm = ({ categoryId, onSubmit, onClear }) => {
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
                    console.error('Error fetching category data:', error.response)
                })
        }
    }, [categoryId])

    const handleChange = e => {
        const { name, value } = e.target
        if (name === 'income') {
            setFormData(prevData => ({
                ...prevData,
                [name]: !prevData.income
            }))
            return
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleClear = () => {
        setFormData(initialFormData)
        setErrorMessage(null)
        setSuccessMessage(null)
        onClear()
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrorMessage(null)
        setSuccessMessage(null)

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
                onSubmit(response.data)
                handleClear()
            })
            .catch(error => {
                setErrorMessage(extractErrorMessageFromResponse(error, formData))
                console.error('Error submitting category data:', error.response?.data)
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
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Check
                    type='switch'
                    name='income'
                    label='Income'
                    checked={formData.income}
                    onChange={handleChange}
                />
            </Form.Group>

            <Status
                successMessage={successMessage}
                errorMessage={errorMessage}
            />

            <div className='mb-3'>
                <Button type='submit' variant='primary'>
                    {categoryId ? 'Update' : 'Create'}
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

export default CategoryForm
