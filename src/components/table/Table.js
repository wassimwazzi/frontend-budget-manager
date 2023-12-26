import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import SearchTable from "./SearchTable";
import TabeleNavigator from "./TableNavigator";

const Table = ({ data, columns, fetchData, totalPages }) => {
    const [searches, setSearches] = useState([]);
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
    }, [sortColumn, sortAsc, searches, currentPage, fetchData]);

    const handleSearch = (searches) => {
        setSearches(searches);
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
            <SearchTable
                columns={columns}
                onSearch={handleSearch}
            />
            <BootstrapTable striped responsive>
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
            </BootstrapTable>
            <TabeleNavigator totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default Table;