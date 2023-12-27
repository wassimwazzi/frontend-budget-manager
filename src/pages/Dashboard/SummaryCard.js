import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';

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

const GradientCard = ({ gradientColors, children }) => {
    return (
        <div className='c-dashboardInfo' style={{ height: '100%' }}>
            <div className='wrap' style={{
                background: `#fff`,
                boxShadow: '2px 10px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '7px',
                position: 'relative',
                textAlign: 'center',
                overflow: 'hidden',
                padding: '40px 25px 20px',
                height: '100%',
            }}>
                <div className='after' style={{
                    display: 'block',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '10px',
                    content: '""',
                    background: `linear-gradient(82.59deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
                }}></div>
                {children}
            </div>
        </div>
    );
};

const getGradientColors = (num = 0) => {
    if (num < 0) {
        return ['#FF5858', '#FF0000']
    } else if (num > 0) {
        return ['#4CAF50', '#087f23']
    } else {
        return ['#FFB800', '#FFD600']
    }
}

const CardValue = ({ title, amount, color = 'black' }) => (
    <div style={{ borderBottom: `2px solid ${color}`, paddingBottom: '10px' }}>
        <p className="lead">{title}</p>
        <h3 className="display-6" style={{ color: color }}>
            ${amount}
        </h3>
    </div>
)


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

    const TrendBlock = ({ children, ...props }) => (
        // used to make sure the trend block is always the same height, and align card body bottom borders
        <div {...props} style={{ display: 'block', height: '50px', overflow: 'auto', marginBottom: '10px' }}>
            {children}
        </div>
    );

    const savings = transactionSummary.this_month?.income - transactionSummary.this_month?.spend;


    return (
        <div className="mt-5">
            <Card border='0'>
                <Row>
                    <Col md={4}>
                        <GradientCard gradientColors={getGradientColors()}>
                            <Card.Body>
                                <TrendBlock />
                                <CardValue title={'Budget'} amount={totalBudget} />
                            </Card.Body>
                        </GradientCard>
                    </Col>
                    <Col md={4}>
                        <GradientCard gradientColors={getGradientColors()}>
                            <Card className="border-0">
                                <Card.Body>
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
                                    <CardValue title={'Spend'} amount={totalSpend} />
                                </Card.Body>
                            </Card>
                        </GradientCard>
                    </Col>
                    <Col md={4}>
                        <GradientCard gradientColors={getGradientColors(totalRemaining)}>
                            <Card className="border-0">
                                <Card.Body >
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
                                    <CardValue
                                        title={'Remaining'}
                                        amount={totalRemaining}
                                        color={totalRemaining < 0 ? 'red' : 'green'}
                                    />
                                </Card.Body>
                            </Card>
                        </GradientCard>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={6}>
                        <GradientCard gradientColors={getGradientColors()}>
                            <Card className="border-0">
                                <Card.Body>
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
                                    <CardValue title={'Income'} amount={transactionSummary.this_month?.income} />
                                </Card.Body>
                            </Card>
                        </GradientCard>
                    </Col>
                    <Col md={6}>
                        <GradientCard gradientColors={getGradientColors(savings)}>
                            <Card className="border-0">
                                <Card.Body>
                                    <TrendBlock>
                                        <Trend
                                            current={savings}
                                            previous={transactionSummary.last_month?.income - transactionSummary.last_month?.spend}
                                            positiveIsGood={true}
                                            text={' from last month'}
                                        />
                                    </TrendBlock>
                                    <CardValue
                                        title={'Savings'}
                                        amount={savings.toFixed(2)}
                                        color={savings < 0 ? 'red' : 'green'}
                                    />
                                </Card.Body>
                            </Card>
                        </GradientCard>
                    </Col>
                </Row>
            </Card>
        </div >
    );
};

export default SummaryCard;
