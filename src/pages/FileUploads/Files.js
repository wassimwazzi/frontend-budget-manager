import React, { useCallback, useState } from 'react'
import api from '../../api'
import FileUploadForm from './FileUploadForm'
import Table from '../../components/table/Table'
import Status from '../../components/Status'
import { DeleteButton } from '../../components/ActionButtons'

const Files = () => {
    const [files, setFiles] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [numDeletedFilesMessage, setNumDeletedFilesMessage] = useState(null)

    const columns = [
        'date',
        'file',
        'status',
        'message',
        'actions'
    ]

    const handleDelete = useCallback(fileId => {
        setNumDeletedFilesMessage(null)
        api
            .delete(`/api/uploads/${fileId}/`)
            .then(response => {
                const deleted_transaction_count = response.data.transaction_count
                setNumDeletedFilesMessage(`File successfully deleted. ${deleted_transaction_count} associated transactions were deleted.`)
                setFiles(files => files.filter(file => file.id !== fileId))
            })
            .catch(error => {
                console.error('Error deleting transaction:', error.response)
            })
    }, [])

    const getActionButtons = useCallback(fileId => (
        <>
            <DeleteButton handleDelete={() => handleDelete(fileId)} />
        </>
    ), [handleDelete])

    const fetchData = useCallback((params) => {
        api
            .get('/api/uploads/', { params })
            .then(({ data }) => {
                setFiles(data.results.map(file => ({
                    ...file,
                    actions: getActionButtons(file.id)
                })))
                setTotalPages(data.count === 0 ? 1 : Math.max(1, Math.ceil(data.count / data.results.length)))
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [getActionButtons])

    const handleFormUpdate = () => {
        fetchData({ page: 1 })
    }

    return (
        <>
            <h1>Files</h1>

            <FileUploadForm
                onSubmit={handleFormUpdate}
            />

            <Status successMessage={numDeletedFilesMessage} />
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
