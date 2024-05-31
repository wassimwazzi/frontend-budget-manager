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
  const [showModal, setShowModal] = useState(false)
  const [nextPrev, setNextPrev] = useState([null, null])

  const fetchData = useCallback((params) => {
    api
      .get('/api/transactions/', { params })
      .then(({ data }) => {
        setTransactions(data.results)
        setTotalPages(data.total_pages)
        setNextPrev([data.next, data.previous])
      })
      .catch(error => {
        console.error('Error fetching data:', error.response)
      })
  }, [])

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

  return (
    <>
      <FloatingIcon onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} size='2x' />
      </FloatingIcon>

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
      {/* 

      <div className='d-flex mb-3'>
        <Button onClick={inferCategories} className='mb-3 me-3' disabled={inferring}>
          Re-infer categories
        </Button>
        <Status loading={inferring} successMessage={inferranceSuccessMessage} errorMessage={inferranceErrorMessage} />
      </div> */}

      <Status successMessage={deleteSucessMessage} errorMessage={deleteErrorMessage} />

      {/* <Table
        columns={columns}
        data={transactions}
        totalPages={totalPages}
        fetchData={fetchData}
        exportData={handleExportToCsv}
        searchColumns={['date', 'code', 'description', 'category', 'amount', 'currency']}
      /> */}
      <TransactionsDisplay transactions={transactions} handleDelete={handleDelete} handleEdit={handleEdit} />
      <TableNavigator initialPage={1} totalPages={totalPages} onPageChange={(page) => fetchData({ page, sort: 'date', order: 'desc' })} />
    </>
  )
}

export default Transactions
