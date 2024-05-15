import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Form, Card } from 'react-bootstrap';

const SearchTable = ({ columns, onSearch, exportData }) => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [newSearchTerm, setNewSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add the new search term and column to the list
    const newSearch = { term: newSearchTerm, column: selectedColumn };
    const newSearches = [...searchTerms, newSearch];
    setSearchTerms(newSearches);
    onSearch(newSearches);
    // Clear the input field
    setNewSearchTerm('');
    // setSelectedColumn(columns[0]);
  };

  const handleExport = () => {
    exportData(searchTerms);
  };

  const handleRemoveSearch = (index) => {
    const newSearches = [...searchTerms.slice(0, index), ...searchTerms.slice(index + 1)];
    setSearchTerms(newSearches);
    onSearch(newSearches);
  };

  const handleClearSearch = () => {
    setSearchTerms([]);
    onSearch([]);
  };

  return (
    <Card className="bg-light mb-3 rounded-lg border-secondary">
      <Card.Body>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3">
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Search..."
                value={newSearchTerm}
                onChange={event => setNewSearchTerm(event.target.value)}
                className='rounded-lg border-secondary'
                required
              />

              <Form.Select
                value={selectedColumn}
                onChange={event => setSelectedColumn(event.target.value)}
                className='ms-2 rounded-lg border-secondary'
                required
              >
                <>
                  <option value="" disabled>
                    Select a column
                  </option>
                  {columns.slice().sort().map(column => (
                    <option key={column} value={column}>
                      {column.replace('_', ' ')}
                    </option>
                  ))}
                </>
              </Form.Select>

              <Button
                variant="primary"
                type="submit"
                className='ms-2'
              >
                Search
              </Button>

              {exportData &&
                <Button variant="info" onClick={handleExport} className='ms-2'>
                  Export
                </Button>
              }

              {searchTerms.length > 0 && (
                <Button variant="secondary" onClick={handleClearSearch} className='ms-2'>
                  Clear All
                </Button>
              )}

            </InputGroup>
            <InputGroup>
              {searchTerms.map((search, index) => (
                <InputGroup.Text key={index} className='rounded-lg bg-transparent text-black me-2'>
                  {search.column}: {search.term}
                  <Button
                    variant="link"
                    onClick={() => handleRemoveSearch(index)}
                    className='ms-2'
                  >
                    Remove
                  </Button>
                </InputGroup.Text>
              ))}
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchTable;
