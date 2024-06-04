import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import BudgetForm from './BudgetForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { formatToHumanReadableDate } from '../../utils/dateUtils'
import { DeleteButton } from '../../components/ActionButtons'

const Budgets = () => {
    const [budgets, setBudgets] = useState([])
    const [editBudgetId, setEditBudgetId] = useState(null)
    const [categories, setCategories] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [statusSuccessMessage, setStatusSuccessMessage] = useState(null)
    const [statusErrorMessage, setStatusErrorMessage] = useState(null)

    const getActionButtons = useCallback(budgetId => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button onClick={() => handleEdit(budgetId)} className='btn btn-primary'>Edit</button>
            <DeleteButton handleDelete={() => handleDelete(budgetId)} />
        </div>
    ), [])

    const customizeBudget = useCallback(budget => {
        return {
            ...budget,
            start_date: formatToHumanReadableDate(budget.start_date, { month: 'long' }),
            category: budget.category.category,
            actions: getActionButtons(budget.id)
        }
    }, [getActionButtons])

    const fetchData = useCallback((params) => {
        api
            .get('/api/budgets/', { params })
            .then(({ data }) => {
                setBudgets(data.results.map(budget => customizeBudget(budget)))
                setTotalPages(data.total_pages)
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
                setStatusErrorMessage(extractErrorMessageFromResponse(error.response))
            })
    }, [customizeBudget])

    useEffect(() => {
        api
            .get('/api/categories/?paginate=false&sort=category&order=asc')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.error('Error fetching categories data:', error.response)
            })
        api
            .get('/api/currencies/?paginate=false')
            .then(response => {
                setCurrencies(response.data)
            })
            .catch(error => {
                console.error('Error fetching currency data:', error.response)
            })
        fetchData()
    }, [fetchData])

    const columns = [
        'amount',
        'currency',
        'start_date',
        'category',
        'actions'
    ]

    const handleEdit = budgetId => {
        setEditBudgetId(budgetId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = budgetId => {
        setStatusSuccessMessage(null)
        setStatusErrorMessage(null)
        api
            .delete(`/api/budgets/${budgetId}/`)
            .then(response => {
                setBudgets(budgets => (budgets.filter(budget => budget.id !== budgetId)))
                setStatusSuccessMessage('Budget successfully deleted.')
            })
            .catch(error => {
                console.error('Error deleting budget:', error.response)
                setStatusErrorMessage(extractErrorMessageFromResponse(error))
            })
    }

    const handleFormUpdate = updatedBudget => {
        updatedBudget = customizeBudget(updatedBudget)
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
                onClear={() => setEditBudgetId(null)}
            />

            <Status successMessage={statusSuccessMessage} errorMessage={statusErrorMessage} />
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
