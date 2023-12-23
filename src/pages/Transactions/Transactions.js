import React, { useEffect, useState } from 'react'
import api from '../../api'
import TransactionForm from './TransactionForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import { Button } from 'react-bootstrap'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [editTransactionId, setEditTransactionId] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [inferring, setInferring] = useState(false)
  const [inferranceSuccessMessage, setInferranceSuccessMessage] = useState(null)
  const [inferranceErrorMessage, setInferranceErrorMessage] = useState(null)

  const getActionButtons = transactionId => (
    <>
      <button onClick={() => handleEdit(transactionId)} className='btn btn-primary'>Edit</button>
      <button onClick={() => handleDelete(transactionId)} className='btn btn-danger ml-2'>Delete</button>
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
    'date',
    'code',
    'description',
    'category',
    'amount',
    'currency',
    'actions'
  ]

  const fetchData = (params) => {
    api
      .get('/api/transactions/', { params })
      .then(({ data }) => {
        setTransactions(data.results.map(transaction => ({
          ...transaction,
          category: transaction.category.category,
          actions: getActionButtons(transaction.id)
        })))
        setTotalPages(data.count === 0 ? 1 : Math.max(1, Math.ceil(data.count / data.results.length)))
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }

  const handleEdit = transactionId => {
    setEditTransactionId(transactionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = transactionId => {
    const shouldDelete = window.confirm("Are you sure?");
    if (!shouldDelete) {
      return
    }
    api
      .delete(`/api/transactions/${transactionId}/`)
      .then(response => {
        setTransactions(transactions.filter(transaction => transaction.id !== transactionId))
      })
      .catch(error => {
        console.error('Error deleting transaction:', error)
      })
  }


  const inferCategories = () => {
    setInferring(true)
    api
      .post('/api/transactions/infer/')
      .then(response => {
        setInferring(false)
        setInferranceSuccessMessage('Categories successfully inferred')
        setInferranceErrorMessage(null)
        fetchData({ page: 1 })
      })
      .catch(error => {
        setInferring(false)
        setInferranceSuccessMessage(null)
        setInferranceErrorMessage('Error infering categories')
        console.error('Error infering categories:', error)
      })
  }

  const handleFormUpdate = updatedTransaction => {
    // Update transactions list after adding/editing
    updatedTransaction.actions = getActionButtons(updatedTransaction.id)
    updatedTransaction.category = updatedTransaction.category.category
    if (editTransactionId) {
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
      setTransactions(updatedTransactions)
    } else {
      setTransactions([updatedTransaction, ...transactions])
    }
    setEditTransactionId(null)
  }

  return (
    <>
      <h1>Transactions</h1>

      <TransactionForm
        transactionId={editTransactionId}
        categories={categories}
        currencies={currencies}
        onUpdate={handleFormUpdate}
      />

      <div className='d-flex mb-3'>
        <Button onClick={inferCategories} className='mb-3' disabled={inferring}>
          Re-infer categories
        </Button>
        <Status loading={inferring} successMessage={inferranceSuccessMessage} errorMessage={inferranceErrorMessage} />
      </div>

      <Table
        columns={columns}
        data={transactions}
        totalPages={totalPages}
        fetchData={fetchData}
      />
    </>
  )
}

export default Transactions
