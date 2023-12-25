import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import PieChart from '../../components/PieChart'
import api from '../../api'

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
                    }
                ])
            })
            .catch(error => {
                console.error('Error fetching data:', error.response)
            })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Spend vs Income by Month',
            }
        },
    };

    return (
        <Line data={{ labels, datasets }} options={options} />
    )
}

const SpendPerCategoryPieChart = () => {
    const [labels, setLabels] = useState([])
    const [datasets, setDatasets] = useState([])

    useEffect(() => {
        api
            .get('/api/transactions/spend_by_category/')
            .then(response => {
                setLabels(response.data.map(d => d.category__category))
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

const HistoricalSummary = () => {
    const PlotContainer = ({ children }) => (
        <Card className="border-0 shadow-lg mb-3">
            {children}
        </Card>
    );

    return (
        <div>
            <h1>Historical Summary</h1>
            <Container className="mt-4 p-4">
                <PlotContainer>
                    <SpendPerCategoryPieChart />
                </PlotContainer>
                <PlotContainer>
                    <SpendVsIncomeLineChart />
                </PlotContainer>
            </Container>
        </div>
    )
}

export default HistoricalSummary
