import { Form, Row, Col, Card } from 'react-bootstrap'

const CardStyle = {
    overflow: 'scroll',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    padding: '0.5rem',
    border: 'none',
}

const SortForm = ({ cols, sortParams, setSortParams }) => {
    const handleSortOrder = () => {
        const order = sortParams.order === 'asc' ? 'desc' : 'asc'
        setSortParams({ ...sortParams, order })
    }

    return (
        <Form>
            <Card style={CardStyle} className='bg-light'>
                <Row>
                    <Form.Label style={{ fontWeight: 'bold' }}>Sort By:</Form.Label>
                </Row>
                <Row>
                    <Col>
                        <Form.Control
                            as="select"
                            name="sort"
                            onChange={e => setSortParams({ ...sortParams, sort: e.target.value })}
                            value={sortParams.sort}
                        >
                            {cols.map(col => (
                                <option value={col} key={col}>{col}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Group controlId="order" className='mt-2'>
                            <Form.Check
                                type="switch"
                                label="Ascending"
                                checked={sortParams.order === 'asc'}
                                onChange={handleSortOrder}
                                style={{ fontWeight: 'bold' }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Card>
        </Form >
    )
}

export default SortForm
