import React, { useState, useEffect } from "react";
import GoalSummary from "./GoalSummary";
import { Button, Row, Col } from "react-bootstrap";
import { getGoalRanking } from "./goalUtils";
import api from "../../api";

function sortGoals(goals) {
    return goals.sort((goal1, goal2) => {
        return getGoalRanking(goal2) - getGoalRanking(goal1);
    });
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
