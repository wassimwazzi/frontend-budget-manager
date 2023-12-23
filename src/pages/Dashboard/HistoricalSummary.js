import React, { useState, useEffect } from 'react'
import { Form, Container, Card, Row, Col } from 'react-bootstrap'
import PieChart from '../../components/PieChart'
import api from '../../api'

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
            </Container>
        </div>
    )
}

export default HistoricalSummary
