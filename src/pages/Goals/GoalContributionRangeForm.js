import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { formatToHumanReadableDate } from "../../utils/dateUtils";

const GreaterThan100Error = ({ currentPercentage }) => (
    <Alert variant="danger">
        Total percentage cannot be greater than 100%. Current percentage: {currentPercentage} %
    </Alert>
);

const SingleContributionRangeSlider = ({ contributionRange, setContributionRange, setError }) => {
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setTotalPercentage(calculateTotalPercentage());
    }, [contributionRange]);

    useEffect(() => {
        console.log("totalPercentage", totalPercentage);
        if (totalPercentage > 100) {
            setError(true);
            setErrorMessage("Total percentage cannot be greater than 100%");
        } else {
            setError(false);
            setErrorMessage("");
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
            {errorMessage && <GreaterThan100Error currentPercentage={totalPercentage} />}
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
                        isInvalid={errorMessage}
                    />
                    <Form.Text>{contribution.percentage}%</Form.Text>
                </Form.Group>
            ))}
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
                        setError={updateErrors(index)}
                    />
                </div>
            ))}
            <Button type="submit" disabled={errors.some((error) => error)}>Submit</Button>
        </Form>
    )

};

export default GoalContributionRangesForm;