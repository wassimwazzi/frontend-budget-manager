import React, { useState } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import SearchTable from "./SearchTable";
import TabeleNavigator from "./TableNavigator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SortedColumn = ({ title, sortAsc }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'space-between' }}>
            <span>{title}</span>
            <span style={{ marginLeft: '5px' }}>
                <FontAwesomeIcon icon={sortAsc ? faChevronUp : faChevronDown} />
            </span>
        </div>
    );
};

const Table = ({ data, columns, fetchData, totalPages, searchColumns }) => {
    const [searches, setSearches] = useState([]);
    const [sortColumn, setSortColumn] = useState(columns[0]);
    const [sortAsc, setSortAsc] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    function updateData(searches, page, sortColumn, sortAsc) {
        const params = {
            page: page,
        };
        if (sortColumn) {
            params.sort = sortColumn;
            params.order = sortAsc ? 'asc' : 'desc';
        }
        searches.forEach(search => {
            if (params.filter && params.filter_value) {
                params.filter.push(search.column);
                params.filter_value.push(search.term);
            }
            else {
                params.filter = [search.column];
                params.filter_value = [search.term];
            }
        });
        fetchData(params);
    }

    const handleSearch = (searches) => {
        setSearches(searches);
        setCurrentPage(1);
        // Reset page to 1 when searching
        updateData(searches, 1, sortColumn, sortAsc);
    };

    const handleSort = (column) => {
        if (column.includes(sortColumn)) {
            setSortAsc(!sortAsc);
        }
        else {
            setSortColumn(column);
            setSortAsc(true);
        }
        updateData(searches, currentPage, column, sortAsc);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        updateData(searches, page, sortColumn, sortAsc);
    }

    return (
        <div>
            <SearchTable
                columns={searchColumns ? searchColumns : columns.filter(column => column !== 'actions')}
                onSearch={handleSearch}
            />

            <BootstrapTable striped responsive>
                <thead>
                    <tr>
                        {columns.map(column => {
                            let columnTitle = column.replace('_', ' ');
                            return (
                                column !== 'actions' ?
                                    <th key={column} onClick={() => handleSort(column)} style={{ cursor: 'pointer' }} className='col-2'>
                                        {column === sortColumn ? (
                                            <SortedColumn title={columnTitle} sortAsc={sortAsc} />
                                        ) : columnTitle}
                                    </th>
                                    :
                                    <th key={column} className='col-2'></th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                <td key={`${index}-${column}`}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </BootstrapTable>

            <TabeleNavigator initialPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Table;