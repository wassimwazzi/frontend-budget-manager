import React, { useState, useEffect } from 'react';
import SearchTable from "./SearchTable";
import TabeleNavigator from "./TableNavigator";

const Table = ({ data, columns, fetchData, totalPages }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('');
    const [currentData, setCurrentData] = useState(data);
    const [sortColumn, setSortColumn] = useState(columns[0]);
    const [sortAsc, setSortAsc] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentData(data);
    }, [data]);

    useEffect(() => {
        const params = {
            page: currentPage,
            sort: sortColumn,
            order: sortAsc ? 'asc' : 'desc',
            filter_value: searchTerm,
            filter: searchColumn
        };
        fetchData(params);
    }, [sortColumn, sortAsc, searchTerm, searchColumn, currentPage]);

    const handleSearch = (searchTerm, searchColumn) => {
        setSearchTerm(searchTerm);
        setSearchColumn(searchColumn);
    };

    const handleSort = (column) => {
        if (column.includes(sortColumn)) {
            setSortAsc(!sortAsc);
        }
        else {
            setSortColumn(column);
            setSortAsc(true);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <SearchTable columns={columns} onSearch={handleSearch} />
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {columns.map(column => (
                            column !== 'actions' ?
                                <th key={column} onClick={() => handleSort(column)} style={{ cursor: 'pointer' }}>
                                    {column === sortColumn ? (sortAsc ? `${column} ▲` : `${column} ▼`) : column}
                                </th>
                                :
                                <th key={column} colSpan={currentData[0] ? currentData[0].actions.length : 1}></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                <td key={`${index}-${column}`}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <TabeleNavigator totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Table;