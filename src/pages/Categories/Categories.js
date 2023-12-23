import React, { useState } from 'react'
import api from '../../api'
import CategoryForm from './CategoryForm'
import Table from '../../components/table/Table'
import { Button } from 'react-bootstrap'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [editCategoryId, setEditCategoryId] = useState(null)
    const [totalPages, setTotalPages] = useState(1)

    const getActionButtons = categoryId => (
        <>
            <Button onClick={() => handleEdit(categoryId)} className='btn btn-primary'>Edit</Button>
            <Button onClick={() => handleDelete(categoryId)} className='btn btn-danger ml-2'>Delete</Button>
        </>
    )

    const columns = [
        'description',
        'category',
        'income',
        'actions'
    ]

    const fetchData = (params) => {
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
                console.error('Error fetching data:', error)
            })
    }

    const handleEdit = categoryId => {
        setEditCategoryId(categoryId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = categoryId => {
        const shouldDelete = window.confirm("Are you sure?");
        if (!shouldDelete) {
            return
        }
        api
            .delete(`/api/categories/${categoryId}/`)
            .then(response => {
                setCategories(categories.filter(category => category.id !== categoryId))
            })
            .catch(error => {
                console.error('Error deleting category:', error)
            })
    }

    const handleFormUpdate = updatedCategory => {
        // Update categories list after adding/editing
        updatedCategory.actions = (
            <button onClick={() => handleEdit(updatedCategory.id)} className='btn btn-primary'>
                Edit
            </button>
        )
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
