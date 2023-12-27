import React, { useState, useEffect } from 'react'
import { Form, Card, Row, Col, Table } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';
import { getCurrentMonth } from '../../utils/dateUtils';
import PieChart from '../../components/PieChart';
import PlotContainer from '../../components/PlotContainer';
import api from '../../api'


const SummaryForm = ({ onUpdate }) => {
    const initialFormData = Object.freeze({
        month: getCurrentMonth(),
    })
    const [formData, setFormData] = useState(initialFormData)

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        onUpdate(formData)
    }, [formData, onUpdate])

    return (
        <Form>
            <Form.Group controlId='formMonth' className='mb-3'>
                <Form.Label>Month</Form.Label>
                <Form.Control
                    type='month'
                    name='month'
                    value={formData.month}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
    )

};

function convertToMonthYear(yyyyMM) {
    const [year, month] = yyyyMM.split('-');
    const date = new Date(Date.UTC(year, month, 1));

    const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
    const yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });

    const monthName = monthFormatter.formatToParts(date).find(part => part.type === 'month').value;
    const fullYear = yearFormatter.formatToParts(date).find(part => part.type === 'year').value;

    return `${monthName} ${fullYear}`;
}

const SummaryTable = ({ data }) => {
    const sigmoid = x => 1 / (1 + Math.exp(-x));

    const cols = [
        'category',
        'budget',
        'actual',
        'remaining'
    ]
    const tableData = data.map(row => ({
        ...row,
        ratio: row.budget === 0 ? 0 : (row.remaining > 0 ? sigmoid(row.remaining / row.budget) : sigmoid(-1 * row.actual / row.budget))
    })).sort((a, b) => a.ratio - b.ratio)

    const totalsRow = {
        category: 'Total',
        budget: data.reduce((acc, row) => acc + row.budget, 0).toFixed(2),
        actual: data.reduce((acc, row) => acc + row.actual, 0).toFixed(2),
        remaining: data.reduce((acc, row) => acc + row.remaining, 0).toFixed(2),
    }
    const getColorForRatio = (ratio) => {
        // color scale from red to green, with yellow in the middle
        // low ratio -> red
        // high ratio -> green
        const red = Math.floor(255 * 2 * (1 - (ratio)));
        const green = Math.floor(255 * 2 * ratio);
        const blue = 0;

        return [red, green, blue];
    };

    const getRowColor = row => {
        const ratio = row.ratio;
        const color = getColorForRatio(ratio);
        return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6)`
    };

    return (
        <Table responsive style={{ border: '0px solid #ddd' }}>
            <thead>
                <tr>
                    {cols.map(column => (
                        <th key={column} style={{ backgroundColor: '#e0e9f0' }}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, index) => (
                    <tr key={index}>
                        {cols.map(column => (
                            <td key={`${index}-${column}`} style={{ backgroundColor: getRowColor(row) }}>
                                {row[column]}
                            </td>
                        ))}
                    </tr>
                ))}
                <tr key={'total'} style={{ backgroundColor: '#e0e9f0' }}>
                    {cols.map(column => (
                        <td key={`total-${column}`} style={{ backgroundColor: '#e0e9f0' }} >
                            {totalsRow[column]}
                        </td>
                    ))}
                </tr>
            </tbody>
        </Table>
    )
}

const BudgetVsActualBarChart = ({ summaryData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    const labels = summaryData.map(item => item.category);
    summaryData.sort((a, b) => b.budget - a.budget);

    const data = {
        labels,
        datasets: [
            {
                label: 'Budget',
                data: summaryData.map(item => item.budget),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                maxBarThickness: 75,
            },
            {
                label: 'Actual Spend',
                data: summaryData.map(item => item.actual),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                maxBarThickness: 75,
            },
        ],
    };

    return (
        <Bar data={data} options={options} />
    );
};

const RemainingFromBudgetBarChart = ({ summaryData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    const labels = summaryData.map(item => item.category);
    summaryData.sort((a, b) => b.remaining - a.remaining);

    const data = {
        labels,
        datasets: [
            {
                label: 'Remaining',
                data: summaryData.map(item => item.remaining),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                maxBarThickness: 150,
            }
        ],
    };

    return (
        <Bar data={data} options={options} />
    );
}

const SpendPerCategoryPieChart = ({ summaryData }) => {
    const labels = summaryData.map(item => item.category);
    const totalSpend = summaryData.reduce((acc, row) => acc + row.actual, 0);
    const datasets = [
        {
            label: 'Actual Spend',
            data: summaryData.map(item => Math.round(item.actual * 100 / totalSpend)),
        }
    ]

    return <PieChart datasets={datasets} labels={labels} title={'% of Total Spend per Category'} />
}

const SummaryCard = ({ summaryData }) => {
    const totalBudget = summaryData.reduce((acc, row) => acc + row.budget, 0).toFixed(2);
    const totalSpend = summaryData.reduce((acc, row) => acc + row.actual, 0).toFixed(2);
    const totalRemaining = summaryData.reduce((acc, row) => acc + row.remaining, 0).toFixed(2);
    return (
        <div className="mt-5">
            <Card border='0' className="shadow-lg">
                <Card.Body>
                    <Card.Title as="h2">Spending Summary</Card.Title>
                    <Row>
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{ borderBottom: '2px solid black' }}>
                                    <p className="lead">Your budget:</p>
                                    <h3 className="display-4">
                                        ${totalBudget}
                                        <span id="totalBudget"></span>
                                    </h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{ borderBottom: '2px solid black' }}>
                                    <p className="lead">Your spend:</p>
                                    <h3 className="display-4">
                                        ${totalSpend}
                                        <span id="totalSpend"></span>
                                    </h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{
                                    borderBottom: totalRemaining < 0 ? '2px solid red' : '2px solid green',
                                }}>
                                    <p className="lead">Your remaining amount:</p>
                                    <h3 className="display-4" style={{
                                        color: totalRemaining < 0 ? 'red' : 'green',
                                    }}>
                                        ${totalRemaining}
                                    </h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

const MonthlySummary = () => {
    const [budgetSummary, setBudgetSummary] = useState([])
    const [month, setMonth] = useState(getCurrentMonth())

    useEffect(() => {
        api
            .get('/api/budgets/summary/?month=' + month)
            .then(response => {
                setBudgetSummary(response.data)
            })
            .catch(error => {
                console.error('Error fetching budget summary:', error.response)
            })
    }, [month])

    const handleUpdate = formData => {
        setMonth(formData.month)
    }

    return (
        <>
            <h1 className="mb-4">Summary for {convertToMonthYear(month)}</h1>
            <SummaryForm onUpdate={handleUpdate} />
            <SummaryCard summaryData={budgetSummary} />
            {
                budgetSummary.length > 0 ?
                    <PlotContainer className="mt-4">
                        <div className='table-responsive'>
                            <SummaryTable data={budgetSummary} title={'Summary Table'} />
                        </div>
                        <BudgetVsActualBarChart summaryData={budgetSummary} title={'Budget vs Spend'} />
                        <RemainingFromBudgetBarChart summaryData={budgetSummary} title={'Remaining from Budget'} />
                        <SpendPerCategoryPieChart summaryData={budgetSummary} title={'Spend Per Category'} />
                    </PlotContainer>
                    :
                    <>
                        <h2 className="mt-5">No data for this month</h2>
                        <p>Please add some budgets and transactions to see the summary.</p>
                    </>
            }
        </>
    );
};

export default MonthlySummary;
