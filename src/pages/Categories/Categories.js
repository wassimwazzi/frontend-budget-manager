import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import CategoryForm from './CategoryForm'
import Table from '../../components/table/Table'
import { Button } from 'react-bootstrap'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { DeleteButton } from '../../components/ActionButtons'
import { useStatus } from '../../components/Status'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editCategoryId, setEditCategoryId] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const { showStatus } = useStatus()

    const getActionButtons = useCallback(categoryId => {
        const handleEdit = categoryId => {
            setEditCategoryId(categoryId)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        const handleDelete = categoryId => {
            api
                .delete(`/api/categories/${categoryId}/`)
                .then(response => {
                    setCategories(categories => categories.filter(category => category.id !== categoryId))
                    showStatus('Category successfully deleted.', 'success')
                })
                .catch(error => {
                    console.error('Error deleting category:', error.response)
                    showStatus(extractErrorMessageFromResponse(error), 'error')
                })
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={() => handleEdit(categoryId)} className='btn btn-primary'>Edit</Button>
                <DeleteButton handleDelete={() => handleDelete(categoryId)} />
            </div>
        )
    }, [showStatus])

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
                showStatus(extractErrorMessageFromResponse(error), 'error')
            })
    }, [getActionButtons, showStatus])

    useEffect(() => {
        fetchData()
    }, [fetchData])

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
