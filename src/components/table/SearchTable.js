import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Form, Card } from 'react-bootstrap';

const SearchOperators = [
  { value: 'contains', label: 'contains', shortLabel: 'contains', caseSensitive: true },
  { value: 'exact', label: 'matches exactly', shortLabel: '=', caseSensitive: true },
  { value: 'startsWith', label: 'starts with', shortLabel: 'starts', caseSensitive: true },
  { value: 'endsWith', label: 'ends with', shortLabel: 'ends', caseSensitive: true },
  { value: 'gt', label: 'is greater than', shortLabel: '>', caseSensitive: false },
  { value: 'lt', label: 'is less than', shortLabel: '<', caseSensitive: false },
  { value: 'gte', label: 'is greater than or equal to', shortLabel: '>=', caseSensitive: false },
  { value: 'lte', label: 'is less than or equal to', shortLabel: '<=', caseSensitive: false },
];

const formSelectContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const formSelectStyle = {
  flex: '1 1 auto', // Allow the select input to grow and shrink
  minWidth: '0', // Prevent overflow
  marginTop: '0.5rem' // Add margin for spacing on small screens
};

const getFilterDisplay = (filter, filterValue, filterOperator) => {
  const filterDisplay = filter.replace('_', ' ');
  const filterValueDisplay = `"${filterValue}"`;
  const operator = filterOperator.startsWith('i') ? filterOperator.slice(1) : filterOperator;
  const displayOperator = SearchOperators.find(op => op.value === operator)?.shortLabel;
  return `${filterDisplay} ${displayOperator} ${filterValueDisplay}`;
};


const INITIAL_SEARCH_TERMS = { filter: [], filter_value: [], filter_operator: [] }
const SearchTable = ({ columns, onSearch, exportData }) => {
  const [searchTerms, setSearchTerms] = useState(INITIAL_SEARCH_TERMS)
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState('contains');

  const handleSearch = (e) => {
    e.preventDefault();
    // set search filters
    const newSearchTerms = searchTerms
    newSearchTerms.filter.push(selectedColumn)

    newSearchTerms.filter_value.push(selectedFilter)

    const operatorObj = SearchOperators.find(operator => operator.value === selectedOperator)
    if (!caseSensitive && operatorObj.caseSensitive) {
      newSearchTerms.filter_operator.push(`i${selectedOperator}`)
    } else {
      newSearchTerms.filter_operator.push(selectedOperator)
    }
    // handle Search
    setSearchTerms(newSearchTerms)
    onSearch(newSearchTerms)

    // clear input
    setSelectedFilter('')
    setSelectedColumn(columns[0])
    setSelectedOperator(SearchOperators[0].value)
  };

  const handleExport = () => {
    exportData(searchTerms);
  };

  const handleRemoveSearch = (index) => {
    const newSearches = INITIAL_SEARCH_TERMS
    for (let key in searchTerms) {
      newSearches[key] = [...searchTerms[key].slice(0, index), ...searchTerms[key].slice(index + 1)]
    }
    // const newSearches = [...searchTerms.slice(0, index), ...searchTerms.slice(index + 1)];
    setSearchTerms(newSearches);
    onSearch(newSearches);
  };

  const handleClearSearch = () => {
    setSearchTerms(INITIAL_SEARCH_TERMS)
    onSearch(INITIAL_SEARCH_TERMS)
  };

  return (
    <Card className="bg-light mb-3 rounded-lg border-secondary">
      <Card.Body>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3">
            <InputGroup className="mb-3">

              <div style={formSelectContainerStyle}>
                <Form.Select
                  value={selectedColumn}
                  onChange={event => setSelectedColumn(event.target.value)}
                  className="responsive-form-select ms-2 rounded-lg border-secondary"
                  style={formSelectStyle}
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
              </div>

              <div style={formSelectContainerStyle}>
                <Form.Select
                  value={selectedOperator}
                  // onChange={event => setSelectedOperator(event.target.value)}
                  onChange={e => setSelectedOperator(e.target.value)}
                  className='ms-2 rounded-lg border-secondary'
                  required
                  style={formSelectStyle}
                >
                  <>
                    {SearchOperators.map(operator => (
                      <option key={operator.value} value={operator.value}>
                        {operator.label}
                      </option>
                    ))}
                  </>
                </Form.Select>
              </div>

              <div style={formSelectContainerStyle}>
                <FormControl
                  type="text"
                  placeholder="Search..."
                  value={selectedFilter}
                  onChange={event => setSelectedFilter(event.target.value)}
                  className='ms-2 rounded-lg border-secondary'
                  required
                  style={formSelectStyle}
                />
              </div>

              <div style={formSelectContainerStyle}>
                <Form.Check
                  type="switch"
                  id="caseSensitiveSwitch"
                  label="Case Sensitive"
                  checked={caseSensitive}
                  onChange={() => setCaseSensitive(!caseSensitive)}
                  className='ms-2'
                  style={formSelectStyle}
                />
              </div>

            </InputGroup>

            <InputGroup className='my-2'>
              {searchTerms.filter.map((filter, index) => (
                <InputGroup.Text key={index} className='rounded-lg bg-transparent text-black me-2'>
                  {getFilterDisplay(filter, searchTerms.filter_value[index], searchTerms.filter_operator[index])}
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

            <InputGroup>
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

              {searchTerms.filter.length > 0 && (
                <Button variant="secondary" onClick={handleClearSearch} className='ms-2'>
                  Clear All
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchTable;
