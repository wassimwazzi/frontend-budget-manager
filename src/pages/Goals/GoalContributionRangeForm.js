import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Alert, ProgressBar, Card } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";
import { useStatus } from "../../components/Status";
import Transition from "../../components/Transition";
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse";
import api from "../../api";
import "./css/GoalContributionForm.css";

function calculateTotalPercentage(contributionRange) {
    let totalPercentage = 0;
    contributionRange.contributions.forEach(
        (contribution) => (totalPercentage += Number(contribution.percentage))
    );
    return totalPercentage;
}

const SingleContributionRangeSlider = ({
    contributionRange,
    setContributionRange,
    preventSubmit,
    index,
}) => {
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [lastChangedBar, setLastChangedBar] = useState(null);

    useEffect(() => {
        setTotalPercentage(calculateTotalPercentage(contributionRange));
    }, [contributionRange]);

    useEffect(() => {
        if (totalPercentage !== 100) {
            preventSubmit(index, true);
        } else {
            preventSubmit(index, false);
        }
    }, [totalPercentage, preventSubmit, index]);

    function handleContributionChange(index) {
        return (e) => {
            const percentage = e.target.value;
            let oldPercentage = contributionRange.contributions[index].percentage;
            contributionRange.contributions[index].percentage = percentage;
            setTotalPercentage(
                (prev) => prev - oldPercentage + Number(percentage)
            );
            setContributionRange(contributionRange);
            setLastChangedBar(index);
        };
    }

    function getColor() {
        if (totalPercentage === 100) {
            return "success";
        }
        if (totalPercentage > 100) {
            return "danger";
        }
        return "warning";
    }

    return (
        <Card
            className={`mb-4 contribution-card custom-card-${getColor()}`}
        >
            <h4 className="mb-3">
                {formatToHumanReadableDate(contributionRange.start_date)} -{" "}
                {formatToHumanReadableDate(contributionRange.end_date)}
            </h4>
            {contributionRange.contributions.map((contribution, index) => (
                <Form.Group
                    key={contribution.id}
                    controlId={`contribution-${contribution.id}`}
                    className="mb-4"
                >
                    <Form.Label className="mb-2 goal-description">
                        <strong>Goal:</strong> {contribution.goal.description}
                    </Form.Label>
                    {
                        contribution.goal.is_finalized ?
                            <p className="text-warning mt-2">
                                <strong>Note:</strong> This goal has been finalized and cannot be edited.
                            </p>
                            :
                            <Form.Range
                                min="0"
                                max="100"
                                step="1"
                                id={contribution.id}
                                value={contribution.percentage}
                                onChange={handleContributionChange(index)}
                            />
                    }
                    <ProgressBar
                        now={contribution.percentage}
                        label={`${contribution.percentage}%`}
                        variant={lastChangedBar === index ? getColor() : "success"}
                        className="mt-2 custom-progress-bar"
                    />
                </Form.Group>
            ))}
            <div className={`mt-4 text-center total-percentage custom-total-percentage text-${getColor()}`}>
                <strong>Total Percentage: {totalPercentage}%</strong>
            </div>
        </Card>
    );
};

const GoalContributionRangesForm = ({
    contributionRanges,
    setContributionRanges,
    onSuccess,
}) => {
    const [errors, setErrors] = useState(contributionRanges.map(() => false));
    const { showStatus } = useStatus();

    const updateErrors = useCallback((index, bool) => {
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[index] = bool;
            return newErrors;
        });
    }, [setErrors]);

    function updateContributionRange(index) {
        return (newContributionRange) => {
            setContributionRanges((prev) => {
                const newContributionRanges = [...prev];
                newContributionRanges[index] = newContributionRange;
                return newContributionRanges;
            });
        };
    }

    function handleSubmit(e) {
        e.preventDefault();
        api
            .post(`/api/goals/update_contributions/`, contributionRanges)
            .then((res) => {
                showStatus("Your contributions have been updated!", "success");
                onSuccess();
            })
            .catch((err) => {
                console.error(err.response);
                showStatus(extractErrorMessageFromResponse(err), "error");
            });
    }

    if (!contributionRanges) {
        return null;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className="mb-4 custom-form-heading">Adjust Contribution Ranges</h2>
            {contributionRanges.map((contributionRange, index) => (
                <SingleContributionRangeSlider
                    key={contributionRange.id}
                    contributionRange={contributionRange}
                    setContributionRange={updateContributionRange(index)}
                    preventSubmit={updateErrors}
                    index={index}
                />
            ))}
            <Transition visible={errors.some((error) => error)} duration={1}>
                <Alert variant="danger" className="mt-4 custom-alert">
                    <p>
                        Please ensure that the total percentage for each contribution
                        range adds up to 100%.
                    </p>
                </Alert>
            </Transition>
            <Button
                type="submit"
                disabled={errors.some((error) => error)}
                className="mt-4 custom-submit-button"
            >
                Save
            </Button>
        </Form>
    );
};

export default GoalContributionRangesForm;
