import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { formatToHumanReadableDate } from '../../utils/dateUtils';
import ProgressBar from '../../components/chart/ProgressBar';
import ProgressChart from '../../components/chart/ProgressChart';


const GoalSummary = ({ goal, link = false }) => (
    <Card
        className="mb-4 border-0"
        style={{
            borderRadius: '20px',
            // backgroundColor: '#F5F5F5',
            // textAlign: 'center',
            padding: '20px',
            boxShadow: '0px 8px 16px #00000029',
        }}>
        <Card.Body>
            <Row className="mb-4">
                <Col md={1} />
                <Col md={3}>
                    <div>
                        <h4>{goal.description}</h4>
                        <p className="lead">Amount: ${Number(goal.amount)}</p>
                        <p className="lead">
                            Start Date: {formatToHumanReadableDate(goal.start_date)}
                        </p>
                        <p className="lead">
                            Target Date: {formatToHumanReadableDate(goal.expected_completion_date)}
                        </p>
                    </div>
                </Col>
                <Col md={1} />
                <Col md={2}>
                    <div className="text-center">
                        <h4>Goal Status</h4>
                        <ProgressBar progress={Math.max(goal.progress, 0)} />
                    </div>
                </Col>
                <Col md={4}>
                    <div className="text-center">
                        <h4>Your Progress</h4>
                        <ProgressChart progress={Math.max(goal.progress, 0)} />
                    </div>
                </Col>
                <Col md={1} />
            </Row>
            {link &&
                <Button variant="outline-primary" size="lg" className="mx-auto" href={`/goals/${goal.id}`}>
                    View Details
                </Button>
            }
        </Card.Body>
    </Card>
);

export default GoalSummary;
