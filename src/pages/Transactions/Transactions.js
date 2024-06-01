import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import TransactionForm from './TransactionForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { formatToHumanReadableDate } from '../../utils/dateUtils'
import { Button, Modal } from 'react-bootstrap'
import { DeleteButton } from '../../components/ActionButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import TransactionsDisplay from './TransactionsDisplay'
import FloatingIcon from '../../components/FloatingIcon'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import TableNavigator from '../../components/table/TableNavigator'
import SearchTable from '../../components/table/SearchTable'
import AddButton from './AddButton'



const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [editTransactionId, setEditTransactionId] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [deleteSucessMessage, setDeleteSucessMessage] = useState(null)
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState({ page: 1 })
  const [sortParams, setSortParams] = useState({ sort: 'date', order: 'desc' })

  const fetchData = useCallback((params) => {
    api
      .get('/api/transactions/', { params })
      .then(({ data }) => {
        setTransactions(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(error => {
        console.error('Error fetching data:', error.response)
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

  const searchColumns = ['date', 'code', 'description', 'category', 'amount', 'currency']

  const handleEdit = transactionId => {
    setEditTransactionId(transactionId)
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowModal(true)
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

  const getParamsHelper = (initialParams, newParams) => {
    const params = { ...initialParams }
    newParams.forEach(search => {
      if (params.filter && params.filter_value) {
        params.filter.push(search.column);
        params.filter_value.push(search.term);
      }
      else {
        params.filter = [search.column];
        params.filter_value = [search.term];
      }
    })
    return params
  }
  const handleSearch = (searchTerms) => {
    const params = getParamsHelper({ page: 1 }, searchTerms)
    setSearchParams(params)
    fetchData({ ...params, ...sortParams })
  }

  const handleExportToCsv = (params) => {
    params = getParamsHelper({}, params)
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

  return (
    <>
      {/* <FloatingIcon onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} size='2x' />
      </FloatingIcon> */}


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

      <Status successMessage={deleteSucessMessage} errorMessage={deleteErrorMessage} />

      <SearchTable columns={searchColumns} exportData={handleExportToCsv} onSearch={handleSearch} />
      <AddButton onClick={handleAdd} />
      <TransactionsDisplay transactions={transactions} handleDelete={handleDelete} handleEdit={handleEdit} />
      <TableNavigator initialPage={1} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  )
}

export default Transactions
