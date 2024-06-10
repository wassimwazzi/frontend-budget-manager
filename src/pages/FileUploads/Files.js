import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api'
import FileUploadForm from './FileUploadForm'
import Table from '../../components/table/Table'
import extractErrorMessageFromResponse from '../../utils/extractErrorMessageFromResponse'
import { formatToHumanReadableDate } from '../../utils/dateUtils'
import { DeleteButton } from '../../components/ActionButtons'
import { useStatus } from '../../components/Status'

const DELETE_WARNING_MESSAGE = 'All transactions associated with this file will be deleted. Are you sure you want to delete this file?'

const Files = () => {
    const [files, setFiles] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const { showStatus } = useStatus()

    const columns = [
        'date',
        'file',
        'status',
        'message',
        'actions'
    ]

    const handleDelete = useCallback(fileId => {
        api
            .delete(`/api/uploads/${fileId}/`)
            .then(response => {
                const deleted_transaction_count = response.data.transaction_count
                showStatus(`File successfully deleted. ${deleted_transaction_count} associated transactions were deleted.`, 'success')
                setFiles(files => files.filter(file => file.id !== fileId))
            })
            .catch(error => {
                console.error('Error deleting transaction:', error.response)
                showStatus(extractErrorMessageFromResponse(error), 'error')
            })
    }, [showStatus])

    const getActionButtons = useCallback(fileId => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <DeleteButton handleDelete={() => handleDelete(fileId)} warningMessage={DELETE_WARNING_MESSAGE} />
        </div>
    ), [handleDelete])

    const customizeFile = useCallback(file => {
        return {
            ...file,
            date: formatToHumanReadableDate(file.date, { month: 'long', day: 'numeric' }),
            actions: getActionButtons(file.id)
        }
    }, [getActionButtons])

    const fetchData = useCallback((params) => {
        api
            .get('/api/uploads/', { params })
            .then(({ data }) => {
                setFiles(data.results.map(file => customizeFile(file)))
                setTotalPages(data.total_pages)
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [customizeFile])

    const handleFormUpdate = () => {
        fetchData({ page: 1 })
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            <h1>Files</h1>

            <FileUploadForm
                onSubmit={handleFormUpdate}
            />

            <Table
                columns={columns}
                data={files}
                totalPages={totalPages}
                fetchData={fetchData}
            />

        </>
    )
}

export default Files
