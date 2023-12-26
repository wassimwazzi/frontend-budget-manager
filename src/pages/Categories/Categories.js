import React, { useCallback, useState } from 'react'
import api from '../../api'
import CategoryForm from './CategoryForm'
import Table from '../../components/table/Table'
import { Button } from 'react-bootstrap'
import Status from '../../components/Status'
import { DeleteButton } from '../../components/ActionButtons'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editCategoryId, setEditCategoryId] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const [deleteSucessMessage, setDeleteSucessMessage] = useState(null)
    const [deleteErrorMessage, setDeleteErrorMessage] = useState(null)

    const getActionButtons = categoryId => (
        <>
            <Button onClick={() => handleEdit(categoryId)} className='btn btn-primary'>Edit</Button>
            <DeleteButton handleDelete={() => handleDelete(categoryId)} />
        </>
    )

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
                setTotalPages(data.count === 0 ? 1 : Math.max(1, Math.ceil(data.count / data.results.length)))
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [])

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
                setDeleteErrorMessage('Error deleting category.')
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
                onUpdate={handleFormUpdate}
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
