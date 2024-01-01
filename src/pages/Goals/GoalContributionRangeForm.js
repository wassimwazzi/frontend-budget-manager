import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Alert, ProgressBar } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";
import Status from "../../components/Status";
import Transition from "../../components/Transition";
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse";
import api from "../../api";

function calculateTotalPercentage(contributionRange) {
    let totalPercentage = 0;
    contributionRange.contributions.forEach((contribution) => {
        totalPercentage += Number(contribution.percentage);
    });
    return totalPercentage;
}

const SingleContributionRangeSlider = ({ contributionRange, setContributionRange, preventSubmit, index }) => {
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [lastChangedBar, setLastChangedBar] = useState(null)

    useEffect(() => {
        setTotalPercentage(calculateTotalPercentage(contributionRange));
    }, [contributionRange]);

    useEffect(() => {
        if (totalPercentage > 100) {
            preventSubmit(index, true);
        } else if (totalPercentage < 100) {
            preventSubmit(index, true);
        }
        else {
            preventSubmit(index, false);
        }
    }, [totalPercentage, preventSubmit, index]);

    function handleContributionChange(index) {
        return (e) => {
            const percentage = e.target.value;
            let oldPercentage = contributionRange.contributions[index].percentage;
            contributionRange.contributions[index].percentage = percentage;
            setTotalPercentage((prev) => (prev - oldPercentage + Number(percentage)));
            setContributionRange(contributionRange);
            setLastChangedBar(index);
        }
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
        <>
            <h3>{formatToHumanReadableDate(contributionRange.start_date)} - {formatToHumanReadableDate(contributionRange.end_date)}</h3>
            {contributionRange.contributions.map((contribution, index) => (
                <Form.Group controlId={`contribution-${contribution.id}`} key={contribution.id}>
                    <Form.Label><strong>Goal description:</strong> {contribution.goal.description} </Form.Label>
                    <Form.Range
                        min="0"
                        max="100"
                        step="1"
                        id={contribution.id}
                        value={contribution.percentage}
                        onChange={handleContributionChange(index)}
                    />
                    <ProgressBar
                        now={contribution.percentage}
                        label={`${contribution.percentage}%`}
                        variant={lastChangedBar === index ? getColor() : "success"}
                    />
                </Form.Group>
            ))}
            <div className={`mt-4 text-center text-${getColor()}`}>
                <strong>Total Percentage: {totalPercentage}%</strong>
            </div>
        </>
    );
};

const GoalContributionRangesForm = ({ goal, contributionRanges, setContributionRanges }) => {
    const [errors, setErrors] = useState(contributionRanges.map(() => false));
    const [submitErrorMessage, setSubmitErrorMessage] = useState();
    const [submitSuccessMessage, setSubmitSuccessMessage] = useState();

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
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitErrorMessage();
        setSubmitSuccessMessage();
        console.log(contributionRanges);
        api
            .post(`/api/goals/update_contributions/`, contributionRanges)
            .then((res) => {
                console.log(res);
                setSubmitSuccessMessage("Your contributions have been updated!");
            })
            .catch((err) => {
                console.error(err.response);
                setSubmitErrorMessage(extractErrorMessageFromResponse(err));
            }
            );
    }


    if (!contributionRanges) {
        return null;
    }

    return (
        <Form onSubmit={handleSubmit}>
            {contributionRanges.map((contributionRange, index) => (
                <div key={contributionRange.id} className="mb-5">
                    <SingleContributionRangeSlider
                        contributionRange={contributionRange}
                        setContributionRange={updateContributionRange(index)}
                        preventSubmit={updateErrors}
                        index={index}
                    />
                </div>
            ))}
            <Transition visible={errors.some((error) => error)} duration={1}>
                <Alert variant="danger">
                    <p>
                        Please make sure that the total percentage for each contribution range is 100%.
                    </p>
                </Alert>
            </Transition>
            <Button type="submit" disabled={errors.some((error) => error)}>Submit</Button>
            <div className="mt-3">
                <Status
                    successMessage={submitSuccessMessage}
                    errorMessage={submitErrorMessage}
                />
            </div>
        </Form>
    )

};

export default GoalContributionRangesForm;