import React, { useState, useEffect } from 'react'
import { Form, Container, Card, Row, Col } from 'react-bootstrap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import api from '../../api'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

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
    }, [formData])

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

function getCurrentMonth() {
    // month in YYYY-MM format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Months are zero-based, so we add 1 to get the current month
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    return `${year}-${month}`;
}

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
    const cols = [
        'category',
        'budget',
        'actual',
        'remaining'
    ]
    const totalsRow = {
        category: 'Total',
        budget: data.reduce((acc, row) => acc + row.budget, 0),
        actual: data.reduce((acc, row) => acc + row.actual, 0),
        remaining: data.reduce((acc, row) => acc + row.remaining, 0)
    }

    const getRowColor = row => {
        const ratio = row.ratio;
        const color = getColorForRatio(ratio);
        return `#${color[0].toString(16).padStart(2, '0')}${color[1].toString(16).padStart(2, '0')}${color[2].toString(16).padStart(2, '0')}`;
    };

    const getColorForRatio = ratio => {
        // 0 means you are over the budget, 1 means you are under the budget, 0.5 means you are at the budget
        const green = Math.floor(255 * ratio);
        const red = 255 - green;
        return [red, green, 0];
    }
    return (
        <table className='table' style={{ border: '1px solid #ddd' }}>
            <thead>
                <tr style={{ backgroundColor: '#e0e9f0' }}>
                    {cols.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: getRowColor(row) }}>
                        {cols.map(column => (
                            <td key={`${index}-${column}`}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
                <tr key={'total'} style={{ backgroundColor: '#e0e9f0' }}>
                    {cols.map(column => (
                        <td key={`total-${column}`}>{totalsRow[column]}</td>
                    ))}
                </tr>
            </tbody>
        </table>
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
    // const getColorArray = (numColors) => {
    //     const colors = [];
    //     for (let i = 0; i < numColors; i++) {
    //         colors.push([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]);
    //     }
    //     return colors;
    // }
    const HSLToRGB = (h, s, l) => {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [255 * f(0), 255 * f(8), 255 * f(4)];
    };

    const getColorArray = (numColors) => {
        const colors = [];
        const step = 360 / numColors;

        for (let i = 0; i < numColors; i++) {
            const hue = i * step;
            const color = HSLToRGB(hue, 100, 50);
            colors.push(color);
        }

        return colors;
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '% of Total Spend per Category'
            }
        },
        radius: '70%'
    };
    const labels = summaryData.map(item => item.category);
    const totalSpend = summaryData.reduce((acc, row) => acc + row.actual, 0);
    const colors = getColorArray(summaryData.length);

    const data = {
        labels,
        datasets: [
            {
                label: 'Actual Spend',
                data: summaryData.map(item => Math.round(item.actual * 100 / totalSpend)),
                backgroundColor: colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`),
                borderColor: colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`),
                // backgroundColor: colors,
                // borderColor: colors,
            },
        ],
    };

    return (
        <Pie data={data} options={options} />
    );
}

const SummaryCard = ({ summaryData }) => {
    const totalBudget = summaryData.reduce((acc, row) => acc + row.budget, 0).toFixed(2);
    const totalSpend = summaryData.reduce((acc, row) => acc + row.actual, 0).toFixed(2);
    const totalRemaining = summaryData.reduce((acc, row) => acc + row.remaining, 0).toFixed(2);
    // className="border-0 shadow-lg"
    return (
        <Container className="mt-5">
            <Card border='0' className="shadow-lg">
                <Card.Body>
                    <Card.Title as="h2">Spending Summary</Card.Title>
                    <Row>
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{ borderBottom: '2px solid black' }}>
                                    <p className="lead">Your total budget:</p>
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
        </Container>
    );
};

const Dashboard = () => {
    const [budgetSummary, setBudgetSummary] = useState([])
    const [month, setMonth] = useState(getCurrentMonth())
    const sigmoid = x => 1 / (1 + Math.exp(-x));

    useEffect(() => {
        api
            .get('/api/budgets/summary/?month=' + month)
            .then(response => {
                setBudgetSummary(response.data.map(row => ({
                    ...row,
                    ratio: row.budget === 0 ? 0 : (row.remaining > 0 ? sigmoid(row.remaining / row.budget) : sigmoid(-1 * row.actual / row.budget))
                })).sort((a, b) => a.ratio - b.ratio))
            })
            .catch(error => {
                console.error('Error fetching budget summary:', error)
            })
    }, [month])

    const handleUpdate = formData => {
        setMonth(formData.month)
    }

    const PlotContainer = ({ children }) => (
        <Card className="border-0 shadow-lg mb-3">
            {children}
        </Card>
    );

    return (
        <>
            <h1 className="mb-4">Budget Summary for {convertToMonthYear(month)}</h1>
            <SummaryForm onUpdate={handleUpdate} />
            <SummaryCard summaryData={budgetSummary} />

            <Container className="mt-4 p-4">
                <PlotContainer>
                    <BudgetVsActualBarChart summaryData={budgetSummary} />
                </PlotContainer>
                <PlotContainer>
                    <RemainingFromBudgetBarChart summaryData={budgetSummary} />
                </PlotContainer>
                <PlotContainer>
                    <SpendPerCategoryPieChart summaryData={budgetSummary} />
                </PlotContainer>
            </Container>
        </>
    );
};

export default Dashboard;
