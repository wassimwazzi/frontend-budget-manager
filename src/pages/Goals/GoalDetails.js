import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import BackLink from "../../components/BackLink";
import GoalSummary from "./GoalSummary";
import GoalContributionRangesForm from "./GoalContributionRangeForm";
import api from "../../api";
import { useStatus } from '../../components/Status'
import Accordion from "../../components/accordion/Accordion";
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse";

const GoalDetails = () => {
    const [goal, setGoal] = useState({});
    const [goalContributionRanges, setGoalContributionRanges] = useState([]);
    const { goalId } = useParams();
    const { showStatus } = useStatus();

    const fetchGoal = useCallback(() => {
        api
            .get(`/api/goals/${goalId}`)
            .then((response) => {
                setGoal(response.data);
            })
            .catch((error) => {
                showStatus(extractErrorMessageFromResponse(error), 'error')
            });
    }, [goalId]);

    const fetchContributions = useCallback(() => {
        api
            .get(`/api/goals/${goalId}/contribution_ranges`, { params: { include_overlapping: true } })
            .then((response) => {
                setGoalContributionRanges(response.data);
            })
            .catch((error) => {
                showStatus(extractErrorMessageFromResponse(error), 'error')
            });
    }, [goalId]);


    useEffect(() => {
        fetchGoal();
        fetchContributions();
    }, [goalId, fetchContributions, fetchGoal]);

    return (
        <Container className="py-5">
            <BackLink href={'/goals'} name={'Goals'} />
            <GoalSummary goal={goal} />
            {
                goalContributionRanges.length > 0 &&
                <Accordion open={false}>
                    <div title="Configure your contributions">
                        <p>
                            Optimize your savings by allocating contributions to specific goals.
                            If you have multiple goals that overlap, customize how much of your savings
                            should be directed towards each individual goal.
                        </p>
                        <GoalContributionRangesForm
                            goal={goal}
                            contributionRanges={goalContributionRanges}
                            setContributionRanges={setGoalContributionRanges}
                            onSuccess={fetchGoal}
                        />
                    </div>
                </Accordion>
            }
        </Container>
    );
};

export default GoalDetails;