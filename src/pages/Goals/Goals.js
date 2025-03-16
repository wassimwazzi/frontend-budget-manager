import React, { useState, useEffect } from "react";
import GoalSummary from "./GoalSummary";
import { Button, Row, Col } from "react-bootstrap";
import { getGoalRanking } from "./goalUtils";
import api from "../../api";

function sortGoals(goals) {
    return goals.sort((goal1, goal2) => {
        let r1 = getGoalRanking(goal1);
        let r2 = getGoalRanking(goal2);
        if (r1 !== r2) {
            return r2 - r1;
        }
        // sort by expected end date in descending order
        return new Date(goal2.expected_completion_date) - new Date(goal1.expected_completion_date);
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
