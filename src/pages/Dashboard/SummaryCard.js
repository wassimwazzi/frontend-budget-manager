import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';

const SummaryCard = ({ budgetSummaryData, month }) => {
    const totalBudget = budgetSummaryData.reduce((acc, row) => acc + row.budget, 0).toFixed(2);
    const totalSpend = budgetSummaryData.reduce((acc, row) => acc + row.actual, 0).toFixed(2);
    const totalRemaining = budgetSummaryData.reduce((acc, row) => acc + row.remaining, 0).toFixed(2);
    const [transactionSummary, setTransactionSummary] = useState({})
    const [lastMonthBudgetTotals, setLastMonthBudgetTotals] = useState({})

    useEffect(() => {
        const [currentYear, currentMonth] = month.split('-').map(Number);
        const currentDate = new Date(currentYear, currentMonth - 1);

        // Subtract one month
        currentDate.setMonth(currentDate.getMonth() - 1);

        // Get the new year and month
        const newYear = currentDate.getFullYear();
        const newMonth = currentDate.getMonth() + 1;
        const lastMonth = `${newYear}-${newMonth.toString().padStart(2, '0')}`;
        api
            .get('/api/budgets/summary/?month=' + lastMonth)
            .then(response => {
                const lastMonthTotalBudget = response.data.reduce((acc, row) => acc + row.budget, 0).toFixed(2);
                const lastMonthTotalSpend = response.data.reduce((acc, row) => acc + row.actual, 0).toFixed(2);
                const lastMonthTotalRemaining = response.data.reduce((acc, row) => acc + row.remaining, 0).toFixed(2);
                setLastMonthBudgetTotals({
                    budget: lastMonthTotalBudget,
                    spend: lastMonthTotalSpend,
                    remaining: lastMonthTotalRemaining,
                })
            })
            .catch(error => {
                console.error('Error fetching budget summary:', error.response)
            })
        api
            .get('/api/transactions/summary/', { params: { month: month } })
            .then(response => {
                /* Looks like:
                {
                    "monthly_average": {
                        "income": 0.0,
                        "spend": 0.0
                    },
                    "this_month": {
                        "income": 0.0,
                        "spend": 0.0
                    },
                    "last_month": {
                        "income": 0.0,
                        "spend": 0.0
                    }
                }
                */
                setTransactionSummary(response.data)
            })
            .catch(error => {
                console.error('Error fetching transaction summary:', error.response)
            })
    }, [month])

    const Trend = ({ current, previous, positiveIsGood = true, text = '' }) => {
        if (!current || !previous) {
            return <></>;
        }
        const diff = current - previous;
        const diffPercent = Math.round(diff * 100 / previous);
        const diffAbs = Math.abs(diff);
        const diffAbsPercent = Math.abs(diffPercent);
        // if positiveIsGood is true, then a positive diff is good, otherwise a negative diff is good
        const isGood = positiveIsGood ? diff > 0 : diff < 0;
        const icon = diff > 0 ? faArrowTrendUp : faArrowTrendDown;

        return (
            <span className="text-muted">
                {
                    isGood ?
                        <FontAwesomeIcon icon={icon} className="text-success" />
                        :
                        <FontAwesomeIcon icon={icon} className="text-danger" />
                }
                {' '} <strong>{diffAbsPercent}%</strong> <i>({diffAbs.toFixed(2)})</i>
                {text}
            </span>
        );
    };

    const TrendBlock = ({ children }) => (
        // used to make sure the trend block is always the same height, and align card body bottom borders
        <div style={{ display: 'block', height: '50px', overflow: 'auto' }}>
            {children}
        </div>
    );

    const savings = transactionSummary.this_month?.income - transactionSummary.this_month?.spend;


    return (
        <div className="mt-5">
            <Card border='0' className="shadow-lg">
                <Card.Body>
                    <Card.Title as="h2">Spending Summary</Card.Title>
                    <Row>
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{ borderBottom: '2px solid black' }}>
                                    <TrendBlock />
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
                                    <TrendBlock>
                                        {transactionSummary.monthly_average && (
                                            <Trend
                                                current={totalSpend}
                                                previous={transactionSummary.monthly_average.spend}
                                                positiveIsGood={false}
                                                text={' from average'}
                                            />
                                        )}
                                    </TrendBlock>
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
                                    <TrendBlock>
                                        {lastMonthBudgetTotals.remaining && (
                                            <Trend
                                                current={totalRemaining}
                                                previous={lastMonthBudgetTotals.remaining}
                                                positiveIsGood={true}
                                                text={' from last month'}
                                            />
                                        )}
                                    </TrendBlock>
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
                    <Row className="mt-5">
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{ borderBottom: '2px solid black' }}>
                                    <TrendBlock>
                                        {transactionSummary.last_month && (
                                            <Trend
                                                current={transactionSummary.this_month?.income}
                                                previous={transactionSummary.last_month?.income}
                                                positiveIsGood={true}
                                                text={' from last month'}
                                            />
                                        )}
                                    </TrendBlock>
                                    <p className="lead">Your income:</p>
                                    <h3 className="display-4">
                                        ${transactionSummary.this_month?.income}
                                        <span id="totalBudget"></span>
                                    </h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0">
                                <Card.Body style={{ borderBottom: `2px solid ${savings > 0 ? 'green' : 'red'}` }}>
                                    {<>
                                    </>
                                    }
                                    <TrendBlock>
                                        <Trend
                                            current={savings}
                                            previous={transactionSummary.last_month?.income - transactionSummary.last_month?.spend}
                                            positiveIsGood={true}
                                            text={' from last month'}
                                        />
                                    </TrendBlock>
                                    <p className="lead">
                                        Your net savings:
                                    </p>
                                    <h3 className="display-4" style={{
                                        color: savings < 0 ? 'red' : 'green',
                                    }}>
                                        ${savings.toFixed(2)}
                                        <span id="totalBudget"></span>
                                    </h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div >
    );
};

export default SummaryCard;