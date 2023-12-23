import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const TableNavigator = ({ totalPages, onPageChange }) => {
    const [page, setPage] = useState(1)

    useEffect(() => {
        onPageChange(page)
    }, [page])

    const handleFirst = () => {
        setPage(1)
    }

    const handlePrevious = () => {
        setPage(page - 1)
    }

    const handleNext = () => {
        setPage(page + 1)
    }

    const handleLast = () => {
        setPage(totalPages)
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <Button
                    variant='outline-secondary'
                    onClick={handleFirst}
                >
                    First
                </Button>
                <Button
                    variant='outline-secondary'
                    onClick={handlePrevious}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <Button
                    variant='outline-secondary'
                    onClick={handleNext}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
                <Button
                    variant='outline-secondary'
                    onClick={handleLast}
                >
                    Last
                </Button>
            </div>
            <p>
                Page {page} of {totalPages}
            </p>
        </>
    )
}

export default TableNavigator
