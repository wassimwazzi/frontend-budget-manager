import React, { useEffect, useState } from 'react'
import api from '../../api'
import BudgetForm from './BudgetForm'
import Table from '../../components/table/Table'

const Budgets = () => {
    const [budgets, setBudgets] = useState([])
    const [editBudgetId, setEditBudgetId] = useState(null)
    const [categories, setCategories] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    const getActionButtons = budgetId => (
        <>
            <button onClick={() => handleEdit(budgetId)} className='btn btn-primary'>Edit</button>
            <button onClick={() => handleDelete(budgetId)} className='btn btn-danger ml-2'>Delete</button>
        </>
    )

    useEffect(() => {
        api
            .get('/api/categories/?paginate=false')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.error('Error fetching currency data:', error)
            })
        api
            .get('/api/currencies/?paginate=false')
            .then(response => {
                setCurrencies(response.data)
            })
            .catch(error => {
                console.error('Error fetching currency data:', error)
            })
    }, [])

    const columns = [
        'amount',
        'currency',
        'start_date',
        'category',
        'actions'
    ]

    const fetchData = (params) => {
        api
            .get('/api/budgets/', { params })
            .then(({ data }) => {
                setBudgets(data.results.map(budget => ({
                    ...budget,
                    category: budget.category.category,
                    actions: getActionButtons(budget.id)
                })))
                setTotalPages(data.count === 0 ? 1 : Math.max(1, Math.ceil(data.count / data.results.length)))
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    const handleEdit = budgetId => {
        setEditBudgetId(budgetId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = budgetId => {
        const shouldDelete = window.confirm("Are you sure?");
        if (!shouldDelete) {
            return
        }
        api
            .delete(`/api/budgets/${budgetId}/`)
            .then(response => {
                setBudgets(budgets.filter(budget => budget.id !== budgetId))
            })
            .catch(error => {
                console.error('Error deleting transaction:', error)
            })
    }

    const handleFormUpdate = updatedBudget => {
        // Update budgets list after adding/editing
        updatedBudget.actions = getActionButtons(updatedBudget.id)
        updatedBudget.category = updatedBudget.category.category
        if (editBudgetId) {
            const updatedBudgets = budgets.map(budget =>
                budget.id === updatedBudget.id
                    ? updatedBudget
                    : budget
            )
            setBudgets(updatedBudgets)
        } else {
            setBudgets([updatedBudget, ...budgets])
        }
        setEditBudgetId(null)
    }

    return (
        <>
            <h1>Budgets</h1>

            <BudgetForm
                budgetId={editBudgetId}
                categories={categories}
                currencies={currencies}
                onUpdate={handleFormUpdate}
            />

            <Table
                columns={columns}
                data={budgets}
                fetchData={fetchData}
                totalPages={totalPages}
            />

        </>
    )
}

export default Budgets
