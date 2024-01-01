import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";

const GreaterThan100Error = ({ currentPercentage, ...props }) => {
    if (currentPercentage > 100) {
        return (
            <Alert variant="danger" {...props}>
                Total percentage cannot be greater than 100%. Current percentage: {currentPercentage} %
            </Alert>
        );
    }
    if (currentPercentage < 100) {
        return (
            <Alert variant="warning" {...props}>
                Total percentage cannot be less than 100%. Current percentage: {currentPercentage} %
            </Alert>
        );
    }
    return null
};

const SingleContributionRangeSlider = ({ contributionRange, setContributionRange, preventSubmit }) => {
    const [totalPercentage, setTotalPercentage] = useState(0);

    useEffect(() => {
        setTotalPercentage(calculateTotalPercentage());
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
    }, [totalPercentage]);

    function calculateTotalPercentage() {
        let totalPercentage = 0;
        contributionRange.contributions.forEach((contribution) => {
            totalPercentage += Number(contribution.percentage);
        });
        return totalPercentage;
    }

    function handleContributionChange(index) {
        return (e) => {
            const percentage = e.target.value;
            const id = e.target.id;
            let oldPercentage = contributionRange.contributions[index].percentage;
            contributionRange.contributions[index].percentage = percentage;
            setTotalPercentage((prev) => (prev - oldPercentage + Number(percentage)));
            setContributionRange(contributionRange);
        }
    }
    return (
        <>
            <h3>{formatToHumanReadableDate(contributionRange.start_date)} - {formatToHumanReadableDate(contributionRange.end_date)}</h3>
            {contributionRange.contributions.map((contribution, index) => (
                <Form.Group controlId={`contribution-${contribution.id}`} key={contribution.id}>
                    <Form.Label>Goal {contribution.goal} </Form.Label>
                    <Form.Range
                        min="0"
                        max="100"
                        step="1"
                        id={contribution.id}
                        value={contribution.percentage}
                        onChange={handleContributionChange(index)}
                    />
                    <Form.Text>{contribution.percentage}%</Form.Text>
                </Form.Group>
            ))}
            <GreaterThan100Error currentPercentage={totalPercentage} className="mt-3" />
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
            <Button type="submit" disabled={errors.some((error) => error)}>Submit</Button>
        </Form>
    )

};

export default GoalContributionRangesForm;