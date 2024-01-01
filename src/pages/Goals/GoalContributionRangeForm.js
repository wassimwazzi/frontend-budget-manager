import React, { useState, useEffect } from "react";
import { Form, Button, Alert, ProgressBar } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";
import Transition from "../../components/Transition";

function calculateTotalPercentage(contributionRange) {
    let totalPercentage = 0;
    contributionRange.contributions.forEach((contribution) => {
        totalPercentage += Number(contribution.percentage);
    });
    return totalPercentage;
}

const SingleContributionRangeSlider = ({ contributionRange, setContributionRange, preventSubmit }) => {
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [lastChangedBar, setLastChangedBar] = useState(null)

    useEffect(() => {
        setTotalPercentage(calculateTotalPercentage(contributionRange));
    }, [contributionRange]);

    useEffect(() => {
        if (totalPercentage > 100) {
            preventSubmit(true);
        } else if (totalPercentage < 100) {
            preventSubmit(true);
        }
        else {
            preventSubmit(false);
        }
    }, [totalPercentage, preventSubmit]);

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

const GoalContributionRangesForm = ({ goal, contributionRanges, setContributionRanges, onSubmit }) => {
    const [errors, setErrors] = useState(contributionRanges.map(() => false));

    function updateErrors(index) {
        return (bool) => {
            setErrors((prev) => {
                const newErrors = [...prev];
                newErrors[index] = bool;
                return newErrors;
            });
        }
    }


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
        console.log("Submitted", JSON.stringify(contributionRanges));
        window.alert("Submitted", JSON.stringify(contributionRanges));
        onSubmit();
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
                        preventSubmit={updateErrors(index)}
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
        </Form>
    )

};

export default GoalContributionRangesForm;