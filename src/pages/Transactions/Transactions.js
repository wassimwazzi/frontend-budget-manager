import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import TransactionForm from './TransactionForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import { Button } from 'react-bootstrap'
import { DeleteButton } from '../../components/ActionButtons'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [editTransactionId, setEditTransactionId] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [inferring, setInferring] = useState(false)
  const [inferranceSuccessMessage, setInferranceSuccessMessage] = useState(null)
  const [inferranceErrorMessage, setInferranceErrorMessage] = useState(null)
  const [deleteSucessMessage, setDeleteSucessMessage] = useState(null)
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null)

  const getActionButtons = useCallback(transactionId => (
    <>
      <button onClick={() => handleEdit(transactionId)} className='btn btn-primary'>Edit</button>
      <DeleteButton handleDelete={() => handleDelete(transactionId)} />
    </>
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
    'date',
    'code',
    'description',
    'category',
    'amount',
    'currency',
    'actions'
  ]

  const fetchData = useCallback((params) => {
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
        console.error('Error fetching data:', error.response)
      })
  }, [getActionButtons])

  const handleEdit = transactionId => {
    setEditTransactionId(transactionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = transactionId => {
    setDeleteSucessMessage(null)
    setDeleteErrorMessage(null)
    api
      .delete(`/api/transactions/${transactionId}/`)
      .then(response => {
        setTransactions(transactions => (
          transactions.filter(transaction => transaction.id !== transactionId)
        ))
        setDeleteSucessMessage('Transaction successfully deleted.')
      })
      .catch(error => {
        console.error('Error deleting transaction:', error.response)
        setDeleteErrorMessage('Error deleting transaction.')
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
        fetchData({ page: 1, sort: 'date', order: 'desc' })
      })
      .catch(error => {
        setInferring(false)
        setInferranceSuccessMessage(null)
        setInferranceErrorMessage('Error infering categories')
        console.error('Error infering categories:', error.response)
      })
  }

  const handleFormUpdate = updatedTransaction => {
    // Update transactions list after adding/editing
    updatedTransaction.actions = getActionButtons(updatedTransaction.id)
    updatedTransaction.category = updatedTransaction.category.category
    if (editTransactionId) {
      setTransactions(transactions => (
        transactions.map(transaction =>
          transaction.id === updatedTransaction.id
            ? updatedTransaction
            : transaction
        )
      ))
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
        onSubmit={handleFormUpdate}
      />

      <div className='d-flex mb-3'>
        <Button onClick={inferCategories} className='mb-3' disabled={inferring}>
          Re-infer categories
        </Button>
        <Status loading={inferring} successMessage={inferranceSuccessMessage} errorMessage={inferranceErrorMessage} />
      </div>

      <Status successMessage={deleteSucessMessage} errorMessage={deleteErrorMessage} />
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
