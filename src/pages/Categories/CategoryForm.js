import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button } from 'react-bootstrap'
import { useStatus } from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'

const CategoryForm = ({ categoryId, onSubmit, onClear }) => {
    const initialFormData = Object.freeze({
        income: false,
        category: '',
        description: '',
    })
    const [formData, setFormData] = useState(initialFormData)
    const { showStatus } = useStatus()

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
        showStatus('', '')
        onClear()
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
                onSubmit(response.data)
                handleClear()
                showStatus(`Category successfully ${action}!`, 'success')
            })
            .catch(error => {
                showStatus(extractErrorMessageFromResponse(error, formData), 'error')
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
