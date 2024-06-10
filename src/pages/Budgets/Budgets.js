import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import BudgetForm from './BudgetForm'
import Table from '../../components/table/Table'
import { useStatus } from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { formatToHumanReadableDate } from '../../utils/dateUtils'
import { DeleteButton } from '../../components/ActionButtons'

const Budgets = () => {
    const [budgets, setBudgets] = useState([])
    const [editBudgetId, setEditBudgetId] = useState(null)
    const [categories, setCategories] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const { showStatus } = useStatus()

    const getActionButtons = useCallback(budgetId => {
        const handleDelete = budgetId => {
            showStatus('', '')
            api
                .delete(`/api/budgets/${budgetId}/`)
                .then(response => {
                    setBudgets(budgets => (budgets.filter(budget => budget.id !== budgetId)))
                    showStatus('Budget successfully deleted.', 'success')
                })
                .catch(error => {
                    console.error('Error deleting budget:', error.response)
                    showStatus(extractErrorMessageFromResponse(error), 'error')
                })
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button onClick={() => handleEdit(budgetId)} className='btn btn-primary'>Edit</button>
                <DeleteButton handleDelete={() => handleDelete(budgetId)} />
            </div>
        )
    }, [showStatus])

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
                showStatus(extractErrorMessageFromResponse(error.response), 'error')
            })
    }, [customizeBudget, showStatus])

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
