import React, { useState, useEffect } from "react";
import GoalSummary from "./GoalSummary";
import { GoalStatusTypes } from "./GoalStatus";
import { Button, Row, Col } from "react-bootstrap";
import api from "../../api";

function sortGoals(goals) {
    // goals requiring action first, then in progress goals, then completed, then failed, then pending
    // goal is requiring action if progress == 100 and status != completed

    const actionRequiredGoals = goals.filter((goal) => goal.progress === 100 && goal.status !== GoalStatusTypes.COMPLETED);
    const inProgressGoals = goals.filter((goal) => goal.progress < 100 && goal.status === GoalStatusTypes.IN_PROGRESS);
    const completedGoals = goals.filter((goal) => goal.status === GoalStatusTypes.COMPLETED);
    const failedGoals = goals.filter((goal) => goal.status === GoalStatusTypes.FAILED);
    const pendingGoals = goals.filter((goal) => goal.status === GoalStatusTypes.PENDING);

    return [...actionRequiredGoals, ...inProgressGoals, ...completedGoals, ...failedGoals, ...pendingGoals];
}

const Goals = () => {
    const [goals, setGoals] = useState([]);

    function fetchData() {
        api
            .get("/api/goals")
            .then((response) => {
                setGoals(sortGoals(response.data));
            })
            .catch((error) => {
                console.error("Error:", error.response);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="p-3"> Goal Tracker</h1>
            <Row className="mb-5">
                <Col className="text-center">
                    <p>Ready to set a new goal?</p>
                    <Button variant="outline-primary" size="lg" href="/goals/new">
                        Click here
                    </Button>
                </Col>
            </Row>

            {goals.map((goal) => (
                <Row key={goal.id} className="mb-4">
                    <GoalSummary goal={goal} link />
                </Row>
            ))}
        </div>
    );
};

export default Goals;
