import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';

const SearchTable = ({ columns, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);

  const handleSearch = () => {
    onSearch(searchTerm, selectedColumn);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('', selectedColumn);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            className='mx-2'
          />

          <Form.Select
            value={selectedColumn}
            onChange={event => setSelectedColumn(event.target.value)}
            className='mx-2'
          >
            {columns.map(column => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </Form.Select>

          <Button variant="primary" onClick={handleSearch} className='mx-2'>
            Search
          </Button>

          {searchTerm && (
            <Button variant="secondary" onClick={handleClearSearch} className='mx-2'>
              Clear
            </Button>
          )}
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchTable;
