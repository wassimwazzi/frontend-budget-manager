import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";
import GoalContributionRangesForm from "./GoalContributionRangeForm";
import api from "../../api";
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse";


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

const FAKE_GOAL_PROGRESS = 50;


const GoalDetails = () => {
    const [goal, setGoal] = useState({});
    const [goalProgress, setGoalProgress] = useState(0);
    const [goalContributionRanges, setGoalContributionRanges] = useState([]);
    const { goalId } = useParams();

    useEffect(() => {
        // api
        //     .get(`/goals/${goalId}`)
        //     .then((response) => {
        //         setGoal(response.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error.response);
        //         alert(getErrorMessageFromResponse(error.response));
        //     });
        setGoal(GOAL_FAKE_DATA);
        setGoalProgress(FAKE_GOAL_PROGRESS);
        setGoalContributionRanges(GOAL_CONTRIBUTION_RANGES);
    }, [goalId]);

    return (
        <>
            <div>
                <h1>{goal.description}</h1>
                <h2>{goal.amount}</h2>
                <h2>{goal.start_date}</h2>
                <h2>{goal.end_date}</h2>
            </div>
            <div>
                <h1>Goal Progress</h1>
                <h2>{goalProgress} %</h2>
            </div>

            {
                goalContributionRanges.length > 0 &&
                <>
                    <div>
                        It looks like you have other goals between
                        {' '}{formatToHumanReadableDate(goal.start_date)} and {formatToHumanReadableDate(goal.expected_completion_date)}.
                    </div>
                    <GoalContributionRangesForm
                        goal={goal}
                        contributionRanges={goalContributionRanges}
                        setContributionRanges={setGoalContributionRanges}
                    />
                </>
            }

        </>
    );
};

export default GoalDetails;