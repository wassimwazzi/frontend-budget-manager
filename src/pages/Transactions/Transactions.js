import React, { useCallback, useEffect, useMemo, useState } from 'react'
import api from '../../api'
import TransactionForm from './TransactionForm'
import Status from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { Modal } from 'react-bootstrap'
import TransactionsDisplay from './TransactionsDisplay'
import TableNavigator from '../../components/table/TableNavigator'
import SearchTable from '../../components/table/SearchTable'
import AddButton, { buttonStyle } from './ControlButton'
import PlaidLink from '../Plaid/Plaid'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [editTransactionId, setEditTransactionId] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [statusSuccessMessage, setStatusSuccessMessage] = useState(null)
  const [statusErrorMessage, setStatusErrorMessage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState({ page: 1 })
  // const [sortParams, setSortParams] = useState({ sort: 'date', order: 'desc' })
  const sortParams = useMemo(() => ({ sort: 'date', order: 'desc' }), [])

  const fetchData = useCallback((params) => {
    api
      .get('/api/transactions/', { params })
      .then(({ data }) => {
        setTransactions(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(error => {
        console.error('Error fetching data:', error.response)
        setStatusErrorMessage(extractErrorMessageFromResponse(error))
      })
  }, [])

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

    fetchData({ ...searchParams, ...sortParams })
  }, [fetchData, searchParams, sortParams])

  const searchColumns = ['date', 'code', 'description', 'category', 'amount', 'currency']

  const handleEdit = transactionId => {
    setEditTransactionId(transactionId)
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowModal(true)
  }

  const handleDelete = transactionId => {
    setStatusSuccessMessage(null)
    setStatusErrorMessage(null)
    api
      .delete(`/api/transactions/${transactionId}/`)
      .then(response => {
        setTransactions(transactions => (
          transactions.filter(transaction => transaction.id !== transactionId)
        ))
        setStatusSuccessMessage('Transaction successfully deleted.')
      })
      .catch(error => {
        console.error('Error deleting transaction:', error.response)
        setStatusErrorMessage(extractErrorMessageFromResponse(error))
      })
  }

  const handleAdd = () => {
    setEditTransactionId(null)
    setShowModal(true)
  }

  const handleFormUpdate = updatedTransaction => {
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
    // setShowModal(false)
  }

  const handlePageChange = page => {
    setSearchParams({ ...searchParams, page })
    fetchData({ ...searchParams, page, ...sortParams })
  }

  const handleSearch = (searchTerms) => {
    const params = { page: 1, ...searchTerms }
    setSearchParams(params)
    fetchData({ ...params, ...sortParams })
  }

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

  const ControlButtons = () => {
    return (
      <div className='d-flex justify-content-around'>
        <AddButton onClick={handleAdd} />
        <PlaidLink buttonText='Link New Account' style={buttonStyle} />
      </div>
    )
  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <TransactionForm
            transactionId={editTransactionId}
            categories={categories}
            currencies={currencies}
            onSubmit={handleFormUpdate}
            onClear={() => setEditTransactionId(null)}
          />
        </Modal.Body>
      </Modal>

      <Status successMessage={statusSuccessMessage} errorMessage={statusErrorMessage} />

      <SearchTable columns={searchColumns} exportData={handleExportToCsv} onSearch={handleSearch} />
      <ControlButtons />
      <TransactionsDisplay transactions={transactions} handleDelete={handleDelete} handleEdit={handleEdit} />
      <TableNavigator initialPage={1} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  )
}

export default Transactions
