import React, { useEffect, useState } from 'react'
import api from '../../api'
import FileUploadForm from './FileUploadForm'
import Table from '../../components/table/Table'

const Files = () => {
    const [files, setFiles] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    const columns = [
        'date',
        'file',
        'status',
        'message',
        'actions'
    ]

    const handleDelete = fileId => {
        const shouldDelete = window.confirm("Are you sure?");
        if (!shouldDelete) {
            return
        }
        api
            .delete(`/api/uploads/${fileId}/`)
            .then(response => {
                setFiles(files.filter(file => file.id !== fileId))
            })
            .catch(error => {
                console.error('Error deleting transaction:', error)
            })
    }

    const fetchData = (params) => {
        api
            .get('/api/uploads/', { params })
            .then(({ data }) => {
                setFiles(data.results.map(file => ({
                    ...file,
                    actions: <button onClick={() => handleDelete(file.id)} className='btn btn-danger ml-2'>Delete</button>
                })))
                setTotalPages(data.count === 0 ? 1 : Math.max(1, Math.ceil(data.count / data.results.length)))
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    const handleFormUpdate = () => {
        fetchData({ page: 1 })
    }

    return (
        <>
            <h1>Files</h1>

            <FileUploadForm
                onUpdate={handleFormUpdate}
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
