import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import CategoryForm from './CategoryForm'
import Table from '../../components/table/Table'
import { Button } from 'react-bootstrap'
import Status from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { DeleteButton } from '../../components/ActionButtons'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editCategoryId, setEditCategoryId] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const [deleteSucessMessage, setDeleteSucessMessage] = useState(null)
    const [deleteErrorMessage, setDeleteErrorMessage] = useState(null)

    const getActionButtons = useCallback(categoryId => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={() => handleEdit(categoryId)} className='btn btn-primary'>Edit</Button>
            <DeleteButton handleDelete={() => handleDelete(categoryId)} />
        </div>
    ), [])

    const columns = [
        'description',
        'category',
        'income',
        'actions'
    ]

    const fetchData = useCallback((params) => {
        api
            .get('/api/categories/', { params })
            .then(({ data }) => {
                setCategories(data.results.map(category => ({
                    ...category,
                    income: category.income ? 'Yes' : 'No',
                    actions: getActionButtons(category.id)
                })))
                setTotalPages(data.total_pages)
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [getActionButtons])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleEdit = categoryId => {
        setEditCategoryId(categoryId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = categoryId => {
        setDeleteSucessMessage(null)
        setDeleteErrorMessage(null)
        api
            .delete(`/api/categories/${categoryId}/`)
            .then(response => {
                setCategories(categories => categories.filter(category => category.id !== categoryId))
                setDeleteSucessMessage('Category successfully deleted.')
            })
            .catch(error => {
                console.error('Error deleting category:', error.response)
                setDeleteErrorMessage(extractErrorMessageFromResponse(error))
            })
    }

    const handleFormUpdate = updatedCategory => {
        // Update categories list after adding/editing
        updatedCategory.actions = getActionButtons(updatedCategory.id)
        if (editCategoryId) {
            const updatedCategories = categories.map(category =>
                category.id === updatedCategory.id
                    ? updatedCategory
                    : category
            )
            setCategories(updatedCategories)
        } else {
            setCategories([updatedCategory, ...categories])
        }
        setEditCategoryId(null)
    }

    return (
        <>
            <h1>Categories</h1>

            <CategoryForm
                categoryId={editCategoryId}
                onSubmit={handleFormUpdate}
                onClear={() => setEditCategoryId(null)}
            />
            <Status successMessage={deleteSucessMessage} errorMessage={deleteErrorMessage} />

            <Table
                columns={columns}
                data={categories}
                fetchData={fetchData}
                totalPages={totalPages}
            />

        </>
    )
}

export default Categories
