import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import PieChart from '../../components/chart/PieChart'
import SortableChart from '../../components/chart/SortableChart';
import Accordion from '../../components/accordion/Accordion'
import api from '../../api'
import getColorArray from '../../utils/getColorArray';
import { Tabs, Tab, Form } from 'react-bootstrap';


const SpendVsIncomeLineChart = () => {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        api
            .get('/api/transactions/spend_vs_income_by_month/')
            .then(response => {
                // sort by increasing month
                response.data.sort((a, b) => a.month.localeCompare(b.month))
                setLabels(response.data.map(d => d.month))
                const net = response.data.map(d => d.income - d.spend)
                setDatasets([
                    {
                        data: response.data.map(d => d.spend),
                        label: 'Spend',
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        data: response.data.map(d => d.income),
                        label: 'Income',
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    },
                    {
                        data: net,
                        label: 'Net',
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                    },
                    // Savings. Cumulative sum of net income
                    {
                        data: net.reduce((acc, value, index) => {
                            acc.push(value + (index > 0 ? acc[index - 1] : 0))
                            return acc
                        }, []),
                        label: 'Savings',
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    },
                ])
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [])

    const annotation = {
        type: 'line',
        mode: 'horizontal',
        yMin: 0,
        yMax: 0,
        value: 0,
        borderColor: 'rgb(201, 203, 207)',
        borderWidth: 3,
        borderDash: [5, 5],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Spend vs Income by Month',
            },
            annotation: {
                annotations: {
                    annotation,
                },
            },
        },
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <Line data={{ labels, datasets }} options={options} style={{ minHeight: '400px', minWidth: '300px' }} />
        </div>
    )
}

const fetchSpendByCategoryData = (params) => {
    return api.get('/api/transactions/spend_by_category/', { params: params })
}

const TotalSpendPerCategoryPieChart = () => {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        fetchSpendByCategoryData()
            .then(response => {
                console.debug("TotalSpendPerCategoryPieChart -> data", response.data)
                setLabels(response.data.map(d => d.category))
                setDatasets([{ data: response.data.map(d => d.total), label: 'Total' }])
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [])

    return (
        <SortableChart datasets={datasets} labels={labels} ChartComponent={PieChart} title={'Total Spend Per Category'} />
    )
}

const AverageSpendPerCategoryPieChart = () => {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])
    const [onlyMonthsWithSpend, setOnlyMonthsWithSpend] = useState(false)

    useEffect(() => {
        fetchSpendByCategoryData({ avg: true, only_months_with_spend: onlyMonthsWithSpend })
            .then(response => {
                console.debug("AverageSpendPerCategoryPieChart -> data", response.data)
                setLabels(response.data.map(d => d.category))
                setDatasets([{ data: response.data.map(d => d.average), label: 'Average' }])
            }
            )
            .catch(error => {
                console.error('Error fetching data:', error.response)
            }
            )
    }, [onlyMonthsWithSpend])

    const OnlyMonthsWithSpendForm = () => {
        const handleCheckboxChange = (event) => {
            setOnlyMonthsWithSpend(event.target.checked)
        }

        return (
            <div className="my-3 mx-3">
                <Form>
                    <Form.Check
                        type="checkbox"
                        id="onlyMonthsWithSpend"
                        label="Only include months with spend for average calculation of each category"
                        checked={onlyMonthsWithSpend}
                        onChange={handleCheckboxChange}
                    />
                </Form>
            </div>
        )
    }

    return (
        <>
            <OnlyMonthsWithSpendForm />
            <SortableChart datasets={datasets} labels={labels} ChartComponent={PieChart} title={'Average Spend Per Category'} />
        </>
    )
}

const MonthlySpendPerCategoryBarChart = () => {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        api
            .get('/api/transactions/spend_by_category/', { params: { monthly: true } })
            .then(response => {
                // sort by increasing month
                response.data.sort((a, b) => a.month.localeCompare(b.month))
                // get unique categories
                const categories = [...new Set(response.data.map(d => d.category))]
                // get unique months
                const months = [...new Set(response.data.map(d => d.month))]
                const colors = getColorArray(categories.length);
                // create a dataset for each category
                const datasets = categories.map((category, index) => ({
                    label: category,
                    data: months.map(month => {
                        const data = response.data.find(d => d.category === category && d.month === month)
                        return data ? data.total : 0
                    }),
                    borderColor: `rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`,
                    backgroundColor: `rgba(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]}, 0.5)`,
                }))
                setLabels(months)
                setDatasets(datasets)

            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Spend Per Category',
            },
        },
    };
    console.log("MonthlySpendPerCategoryBarChart -> datasets", datasets)
    return (
        <div style={{ overflowX: 'auto' }}>
            <SortableChart datasets={datasets} labels={labels} ChartComponent={Bar} options={options} style={{ minHeight: '500px', minWidth: '400px' }} />
        </div>
    )
}

const SpendPerCategory = () => {
    // Tabs for Total Spend Per Category and Average Spend Per Category and Monthly Spend Per Category
    const [activeTab, setActiveTab] = useState('total')

    return (
        <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)}>
            <Tab eventKey="total" title="Total">
                <TotalSpendPerCategoryPieChart />
            </Tab>
            <Tab eventKey="average" title="Average">
                <AverageSpendPerCategoryPieChart />
            </Tab>
            <Tab eventKey="monthly" title="Monthly">
                <MonthlySpendPerCategoryBarChart />
            </Tab>
        </Tabs>
    )

}

const HistoricalSummary = () => {
    return (
        <>
            <h1 className="mb-4">Historical Summary</h1>
            <Accordion>
                <SpendVsIncomeLineChart title={'Spend vs Income Per Month'} />
                <SpendPerCategory title={'Spend Per Category'} />
            </Accordion>
        </>
    )
}

export default HistoricalSummary
