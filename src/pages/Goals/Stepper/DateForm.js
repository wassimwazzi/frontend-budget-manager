import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getCurrentMonth } from "../../../utils/dateUtils";
import Transition from "../../../components/Transition";


const DateForm = ({ start_date, expected_completion_date, updateFields, setPreventSubmit }) => {
    const [useDefaultStart, setUseDefaultStart] = useState(true);
    const [startBeforeEnd, setStartBeforeEnd] = useState(true);

    useEffect(() => {
        if (start_date > expected_completion_date) {
            setStartBeforeEnd(false);
        } else {
            setStartBeforeEnd(true);
        }
    }, [start_date, expected_completion_date]);

    useEffect(() => {
        setPreventSubmit(!useDefaultStart && !startBeforeEnd);
    }, [useDefaultStart, startBeforeEnd, setPreventSubmit])

    function toggleStart() {
        if (!useDefaultStart) {
            // If we're switching to default start, set start date to current month
            updateFields({ start_date: getCurrentMonth() });
        }
        setUseDefaultStart(!useDefaultStart);
    }


    function handleChange(e) {
        const input = e.target.value;
        const name = e.target.name;
        updateFields({ [name]: input });
    }

    return (
        <>
            <Form.Group controlId="end-date">
                <Form.Label>When do you want to achieve your goal by?</Form.Label>
                <input
                    type="month"
                    className="form-control"
                    name="expected_completion_date"
                    value={expected_completion_date}
                    onChange={handleChange}
                    required
                    min={getCurrentMonth()}
                />
            </Form.Group>
            <Form.Group controlId="start-date" className="mt-3">
                <Form.Text className="text-muted">
                    Would you like to start saving for this goal right now?
                </Form.Text>
                <Form.Check
                    type="switch"
                    checked={useDefaultStart}
                    onChange={toggleStart}
                />
            </Form.Group>
            <Transition visible={!useDefaultStart} duration={0.5}>
                <Form.Group controlId="start-date" className="mt-3">
                    <Form.Label>
                        Please enter a start date for your goal.
                    </Form.Label>
                    <Form.Control
                        type="month"
                        className="form-control"
                        name="start_date"
                        value={start_date}
                        onChange={handleChange}
                        max={expected_completion_date}
                        isInvalid={!startBeforeEnd}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Start date must be before end date.
                    </Form.Control.Feedback>
                </Form.Group>
            </Transition>
        </>
    );
};

export default DateForm;
