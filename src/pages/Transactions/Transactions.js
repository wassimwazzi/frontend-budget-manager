import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import TransactionForm from './TransactionForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { formatToHumanReadableDate } from '../../utils/dateUtils'
import { Button } from 'react-bootstrap'
import { DeleteButton } from '../../components/ActionButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faMinus } from '@fortawesome/free-solid-svg-icons'

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
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <button onClick={() => handleEdit(transactionId)} className='btn btn-primary'>Edit</button>
      <DeleteButton handleDelete={() => handleDelete(transactionId)} />
    </div>
  ), [])

  const getInferredCategory = useCallback(inferredCategory => (
    inferredCategory ? (
      <div style={{ textAlign: 'center' }}>
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} size='lg' />
      </div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <FontAwesomeIcon icon={faMinus} size='lg' />
      </div>
    )
  ), [])

  const customizeTransaction = useCallback(transaction => {
    return {
      ...transaction,
      date: formatToHumanReadableDate(transaction.date, { month: 'short', day: 'numeric', weekday: 'short' }),
      category: transaction.category.category,
      inferred_category: getInferredCategory(transaction.inferred_category),
      actions: getActionButtons(transaction.id)
    }
  }, [getActionButtons, getInferredCategory])

  const fetchData = useCallback((params) => {
    api
      .get('/api/transactions/', { params })
      .then(({ data }) => {
        setTransactions(data.results.map(transaction => customizeTransaction(transaction)))
        setTotalPages(data.total_pages)
      })
      .catch(error => {
        console.error('Error fetching data:', error.response)
      })
  }, [customizeTransaction])

  const handleExportToCsv = (params) => {
    api
      .get('/api/exports/transactions/', { params })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'transactions.csv')
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
      .catch(error => {
        console.error('Error exporting data:', error)
      })
  }

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

    fetchData({ page: 1, sort: 'date', order: 'desc' })
  }, [fetchData])


  const columns = [
    'date',
    'code',
    'description',
    'category',
    'inferred_category',
    'amount',
    'currency',
    'actions'
  ]

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
        setDeleteErrorMessage(extractErrorMessageFromResponse(error))
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
    updatedTransaction = customizeTransaction(updatedTransaction)
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
        onClear={() => setEditTransactionId(null)}
      />

      <div className='d-flex mb-3'>
        <Button onClick={inferCategories} className='mb-3 me-3' disabled={inferring}>
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
        exportData={handleExportToCsv}
        searchColumns={['date', 'code', 'description', 'category', 'amount', 'currency']}
      />
    </>
  )
}

export default Transactions
