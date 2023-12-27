import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import BudgetForm from './BudgetForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import { DeleteButton } from '../../components/ActionButtons'

const Budgets = () => {
    const [budgets, setBudgets] = useState([])
    const [editBudgetId, setEditBudgetId] = useState(null)
    const [categories, setCategories] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [deleteSucessMessage, setDeleteSucessMessage] = useState(null)
    const [deleteErrorMessage, setDeleteErrorMessage] = useState(null)

    const getActionButtons = useCallback(budgetId => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button onClick={() => handleEdit(budgetId)} className='btn btn-primary'>Edit</button>
            <DeleteButton handleDelete={() => handleDelete(budgetId)} />
        </div>
    ), [])

    useEffect(() => {
        api
            .get('/api/categories/?paginate=false&sort=category&order=asc')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.error('Error fetching currency data:', error.response)
            })
        api
            .get('/api/currencies/?paginate=false')
            .then(response => {
                setCurrencies(response.data)
            })
            .catch(error => {
                console.error('Error fetching currency data:', error.response)
            })
    }, [])

    const columns = [
        'amount',
        'currency',
        'start_date',
        'category',
        'actions'
    ]

    const fetchData = useCallback((params) => {
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
                console.error('Error fetching data:', error.response)
            })
    }, [getActionButtons])

    const handleEdit = budgetId => {
        setEditBudgetId(budgetId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = budgetId => {
        setDeleteSucessMessage(null)
        setDeleteErrorMessage(null)
        api
            .delete(`/api/budgets/${budgetId}/`)
            .then(response => {
                setBudgets(budgets => (budgets.filter(budget => budget.id !== budgetId)))
                setDeleteSucessMessage('Budget successfully deleted.')
            })
            .catch(error => {
                console.error('Error deleting transaction:', error.response)
                setDeleteErrorMessage('Error deleting budget.')
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
                onSubmit={handleFormUpdate}
            />

            <Status successMessage={deleteSucessMessage} errorMessage={deleteErrorMessage} />
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
