import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { formatToHumanReadableDate } from '../../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { currentlyContributingTo } from './goalUtils';
import ProgressBar from '../../components/chart/ProgressBar';
import GoalStatus, { GoalStatusTypes } from './GoalStatus';

function formatNumber(amount) {
    return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const NoContributionsWarning = ({ goal }) => {
    if (currentlyContributingTo(goal)) {
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

const Pill = ({ children, color }) => (
    <div className={`d-flex align-items-center my-3 rounded-pill p-3 ${color} border`}>
        {children}
    </div>
);

const AmountSaved = ({ goal }) => {
    if (goal.total_contributed == 0) {
        return (
            <Pill>
                <span className='lead'>
                    You have not yet saved anything of {formatNumber(goal.amount)} target
                </span>
            </Pill>
        );
    }
    if (goal.total_contributed > 0) {
        return (
            <Pill color='text-success'>
                <FontAwesomeIcon icon={faThumbsUp} className='px-2' />
                <span className='lead'>
                    You have saved {formatNumber(goal.total_contributed)} of {formatNumber(goal.amount)} target
                </span>
            </Pill>
        );
    }
    return (
        <Pill color='text-danger'>
            <FontAwesomeIcon icon={faThumbsDown} className='px-2' />
            <span className='lead'>
                You are down {formatNumber(goal.total_contributed)} of {formatNumber(goal.amount)} target
            </span>
        </Pill>
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
                <Col md={6} className="d-flex justify-content-between flex-column p-4">
                    <div className='p-2'>
                        <h4>{goal.description}</h4>
                    </div>
                    <div className='mt-2'>
                        <GoalStatus goal={goal} />
                    </div>
                </Col>
                <Col md={6}>
                    <Row>
                        <div className="text-center">
                            <h4>Goal Status</h4>
                            <ProgressBar progress={Math.max(goal.progress, 0)} />
                            <AmountSaved goal={goal} />
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
                (goal.status === GoalStatusTypes.IN_PROGRESS | goal.status === GoalStatusTypes.PENDING) ?
                    <div className='text-center'>
                        <Button variant="outline-primary" size="lg" className="mx-auto" href={`/goals/${goal.id}/edit`}>
                            Edit Goal
                        </Button>
                    </div>
                    : null
            }
        </Card.Body>
    </Card>
);

export default GoalSummary;
