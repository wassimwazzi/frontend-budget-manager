import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleLeft,
    faAngleRight,
    faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';

const TableNavigator = ({ initialPage, totalPages, onPageChange }) => {
    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        setPage(initialPage);
    }, [initialPage]);

    function goToPage(page) {
        setPage(page);
        onPageChange(page);
    }

    const getMiddlePages = () => {
        const middlePages = [];
        if (page - 2 > 0) {
            middlePages.push(page - 2);
        }
        if (page - 1 > 0) {
            middlePages.push(page - 1);
        }
        middlePages.push(page);
        if (page + 1 <= totalPages) {
            middlePages.push(page + 1);
        }
        if (page + 2 <= totalPages) {
            middlePages.push(page + 2);
        }
        return middlePages;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="btn-group" role="group" aria-label="Pagination">
                <Button
                    variant="outline-secondary"
                    onClick={() => goToPage(1)}
                >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
                {getMiddlePages().map((middlePage) => (
                    <Button
                        key={middlePage}
                        variant={middlePage === page ? 'primary' : 'outline-secondary'}
                        onClick={() => goToPage(middlePage)}
                    >
                        {middlePage}
                    </Button>
                ))}
                <Button
                    variant="outline-secondary"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={() => goToPage(totalPages)}
                >
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Button>
            </div>
            <Badge className="mt-2" bg='light' text='dark' pill>
                Total Pages: {totalPages}
            </Badge>
        </div>
    );
};

export default TableNavigator;
