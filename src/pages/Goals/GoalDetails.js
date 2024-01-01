import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, Button, ProgressBar as ProgressBarBootstrap } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";
import ProgressChart from "../../components/chart/ProgressChart";
import GoalContributionRangesForm from "./GoalContributionRangeForm";
import api from "../../api";
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse";
import Accordion from "../../components/accordion/Accordion";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FormContainer = styled.div`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: ${(props) => (props.visible ? "auto" : 0)};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  animation: ${(props) => (props.visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
`;
const GOAL_FAKE_DATA = {
    "id": 1,
    "amount": "1000.00",
    "expected_completion_date": "2024-10",
    "actual_completion_date": null,
    "type": "SAVINGS",
    "description": "test",
    "status": "IN_PROGRESS",
    "start_date": "2023-12",
    "recurring": "NON_RECURRING",
    "reccuring_frequency": null,
    "contributions": [
        {
            "id": 3,
            "amount": null,
            "goal": 1,
            "start_date": "2024-10-01",
            "end_date": "2024-10-31",
            "percentage": 100
        },
        {
            "id": 9,
            "amount": null,
            "goal": 1,
            "start_date": "2023-12-01",
            "end_date": "2024-09-30",
            "percentage": 50
        }
    ]
}

const GOAL_CONTRIBUTION_RANGES = [
    {
        "id": 3,
        "start_date": "2023-12-01",
        "end_date": "2024-09-30",
        "user": 1,
        "contributions": [
            {
                "id": 9,
                "amount": null,
                "goal": 1,
                "start_date": "2023-12-01",
                "end_date": "2024-09-30",
                "percentage": 50
            },
            {
                "id": 10,
                "amount": null,
                "goal": 2,
                "start_date": "2023-12-01",
                "end_date": "2024-09-30",
                "percentage": 50
            }
        ]
    },
    {
        "id": 4,
        "start_date": "2024-10-01",
        "end_date": "2024-10-31",
        "user": 1,
        "contributions": [
            {
                "id": 3,
                "amount": null,
                "goal": 1,
                "start_date": "2024-10-01",
                "end_date": "2024-10-31",
                "percentage": 100
            }
        ]
    }
]

const ProgressBar = ({ progress }) => {
    return (
        <ProgressBarBootstrap>
            <ProgressBarBootstrap variant="success" now={progress} key={1} label={`${progress}%`} />
            <ProgressBarBootstrap striped variant="danger" now={100 - progress} key={2} />
        </ProgressBarBootstrap>
    );
};

const GoalDetails = () => {
    const [goal, setGoal] = useState({});
    const [goalProgress, setGoalProgress] = useState(0);
    const [goalContributionRanges, setGoalContributionRanges] = useState([]);
    const { goalId } = useParams();

    useEffect(() => {
        api
            .get(`/api/goals/${goalId}`)
            .then((response) => {
                setGoal(response.data);
                setGoalProgress(Math.min(0, response.data.progress));
            })
            .catch((error) => {
                console.error("Error:", error.response);
                alert(extractErrorMessageFromResponse(error.response));
            });
        api
            .get(`/api/goals/${goalId}/contribution_ranges`, { params: { include_overlapping: true } })
            .then((response) => {
                setGoalContributionRanges(response.data);
            })
            .catch((error) => {
                console.error("Error:", error.response);
                alert(extractErrorMessageFromResponse(error.response));
            });

        // setGoal(GOAL_FAKE_DATA);
        // setGoalProgress(FAKE_GOAL_PROGRESS);
        // setGoalContributionRanges(GOAL_CONTRIBUTION_RANGES);
    }, [goalId]);

    return (
        <Container className="py-5">
            <Card
                className="mb-4 border-0"
                style={{
                    borderRadius: '20px',
                    // backgroundColor: '#F5F5F5',
                    textAlign: 'center',
                    padding: '20px',
                    boxShadow: '0px 8px 16px #00000029',
                }}>
                <Card.Body>
                    <Row className="mb-4">
                        <Col md={1} />
                        <Col md={3}>
                            <div>
                                <h4>{goal.description}</h4>
                                <p className="lead">description: {goal.description}</p>
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
                                <ProgressBar progress={goalProgress} />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <h4>Your Progress</h4>
                                <ProgressChart progress={goalProgress} />
                            </div>
                        </Col>
                        <Col md={1} />
                    </Row>
                </Card.Body>
            </Card>
            {
                goalContributionRanges.length > 0 &&
                <Accordion open={false}>
                    <GoalContributionRangesForm
                        goal={goal}
                        contributionRanges={goalContributionRanges}
                        setContributionRanges={setGoalContributionRanges}
                        title="Configure your contributions"
                    />
                </Accordion>
            }
        </Container>
    );
};

export default GoalDetails;