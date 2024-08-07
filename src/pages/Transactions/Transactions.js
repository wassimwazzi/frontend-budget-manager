import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import TransactionForm from './TransactionForm'
import { useStatus } from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { Modal } from 'react-bootstrap'
import TransactionsDisplay from './TransactionsDisplay'
import TableNavigator from '../../components/table/TableNavigator'
import SearchTable from '../../components/table/SearchTable'
import AddButton, { buttonStyle } from './ControlButton'
import PlaidLink, { generateToken } from '../Plaid/Plaid'
import SortForm from './SortForm'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [editTransactionId, setEditTransactionId] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState({ page: 1 })
  const [sortParams, setSortParams] = useState({ sort: 'date', order: 'desc' })
  const [linkToken, setLinkToken] = useState(null)
  const { showStatus } = useStatus()

  const fetchData = useCallback((params) => {
    api
      .get('/api/transactions/', { params })
      .then(({ data }) => {
        setTransactions(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(error => {
        console.error('Error fetching data:', error.response)
        showStatus(extractErrorMessageFromResponse(error), 'error')
      })
  }, [showStatus])

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
    generateToken(setLinkToken)
  }, [fetchData, searchParams, sortParams])

  const searchColumns = ['date', 'code', 'description', 'category', 'amount', 'currency']

  const handleEdit = transactionId => {
    setEditTransactionId(transactionId)
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowModal(true)
  }

  const handleDelete = transactionId => {
    api
      .delete(`/api/transactions/${transactionId}/`)
      .then(response => {
        setTransactions(transactions => (
          transactions.filter(transaction => transaction.id !== transactionId)
        ))
        showStatus('Transaction successfully deleted.', 'success')
      })
      .catch(error => {
        console.error('Error deleting transaction:', error.response)
        showStatus(extractErrorMessageFromResponse(error), 'error')
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
    setShowModal(false)
  }

  const handlePageChange = page => {
    setSearchParams({ ...searchParams, page })
  }

  const handleSearch = (searchTerms) => {
    const params = { page: 1, ...searchTerms }
    setSearchParams(params)
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
      <div className='d-flex justify-content-around align-items-center flex-wrap my-2'>
        <div className='mt-2'>
          <AddButton onClick={handleAdd} />
        </div>
        <div className='ms-2 mt-2'>
          <PlaidLink linkToken={linkToken} buttonText='Link New Account' style={buttonStyle} />
        </div>
        <div className='ms-2 mt-2'>
          <SortForm cols={searchColumns} sortParams={sortParams} setSortParams={setSortParams} />
        </div>
      </div >
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

      <SearchTable columns={searchColumns} exportData={handleExportToCsv} onSearch={handleSearch} />
      <ControlButtons />
      <TransactionsDisplay transactions={transactions} handleDelete={handleDelete} handleEdit={handleEdit} />
      <TableNavigator initialPage={1} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  )
}

export default Transactions
