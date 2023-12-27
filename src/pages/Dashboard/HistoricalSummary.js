import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import PieChart from '../../components/PieChart'
import PlotContainer from '../../components/PlotContainer'
import api from '../../api'
import getColorArray from '../../utils/getColorArray';

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
                        data: response.data.map(d => d.income - d.spend),
                        label: 'Net',
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                    }
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

const SpendPerCategoryPieChart = () => {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        api
            .get('/api/transactions/spend_by_category/')
            .then(response => {
                setLabels(response.data.map(d => d.category))
                setDatasets([{ data: response.data.map(d => d.total), label: 'Total' }])
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [])

    return (
        <PieChart datasets={datasets} labels={labels} title={'Spend Per Category'} />
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

    return (
        <div style={{ overflowX: 'auto' }}>
            <Bar data={{ labels, datasets }} options={options} style={{ minHeight: '500px', minWidth: '400px' }} />
        </div>
    )
}

const HistoricalSummary = () => {
    return (
        <>
            <h1 className="mb-4">Historical Summary</h1>
            <PlotContainer>
                <SpendVsIncomeLineChart title={'Spend vs Income Per Month'} />
                <SpendPerCategoryPieChart title={'Total Spend Per Category'} />
                <MonthlySpendPerCategoryBarChart title={'Monthly Spend Per Category'} />
            </PlotContainer>
        </>
    )
}

export default HistoricalSummary
