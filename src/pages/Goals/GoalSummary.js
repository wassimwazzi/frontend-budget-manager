import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { formatToHumanReadableDate, getCurrentDay } from '../../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '../../components/chart/ProgressBar';
import GoalStatus from './GoalStatus';

function formatNumber(amount) {
    return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const NoContributionsWarning = ({ goal }) => {
    if (!goal.contributions?.length) {
        return null;
    }
    const today = getCurrentDay();
    const todayContribution = goal.contributions.find(({ start_date, end_date }) => {
        return start_date <= today && today <= end_date;
    });
    if (todayContribution.percentage > 0) {
        return null;
    }
    return (
        <div className="d-flex align-items-center" >
            <span className="text-danger px-2">
                <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
            <span className='lead text-danger'>
                You are not currently contributing to this goal
            </span>
        </div>
    );
};

const GoalSummary = ({ goal, link = false }) => (
    <Card
        className="mb-4 border-0"
        style={{
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0px 8px 16px #00000029',
        }}>
        <Card.Body>
            <Row className="mb-4 p-3">
                <Col md={6} className="d-flex justify-content-between flex-column">
                    <div>
                        <h4>{goal.description}</h4>
                    </div>
                    <GoalStatus goal={goal} />
                </Col>
                <Col md={6}>
                    <Row>
                        <div className="text-center">
                            <h4>Goal Status</h4>
                            <ProgressBar progress={Math.max(goal.progress, 0)} />
                            <p className="lead mt-2">
                                You have saved {formatNumber(goal.total_contributed)} of {formatNumber(goal.amount)} target
                            </p>
                            <p className="lead mt-2">
                                Start Date: {formatToHumanReadableDate(goal.start_date)}
                            </p>
                            <p className="lead mt-2">
                                Target Date: {formatToHumanReadableDate(goal.expected_completion_date)}
                            </p>
                            <NoContributionsWarning goal={goal} />
                        </div>
                    </Row>
                </Col>
            </Row>
            {link ?
                <div className='text-center'>
                    <Button variant="outline-primary" size="lg" className="mx-auto" href={`/goals/${goal.id}`}>
                        View Details
                    </Button>
                </div>
                :
                <div className='text-center'>
                    <Button variant="outline-primary" size="lg" className="mx-auto" href={`/goals/${goal.id}/edit`}>
                        Edit Goal
                    </Button>
                </div>
            }
        </Card.Body>
    </Card>
);

export default GoalSummary;
