import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { getCurrentMonth } from "../../../utils/dateUtils";

const StyledTransitionContainer = styled.div`
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;

  &.visible {
    max-height: 1000px;
    opacity: 1;
  }
`;

const DescriptionForm = ({ start_date, end_date, updateFields, setPreventSubmit }) => {
    const [useDefaultStart, setUseDefaultStart] = useState(true);
    const [startBeforeEnd, setStartBeforeEnd] = useState(true);

    useEffect(() => {
        if (start_date > end_date) {
            setStartBeforeEnd(false);
        } else {
            setStartBeforeEnd(true);
        }
    }, [start_date, end_date]);

    useEffect(() => {
        setPreventSubmit(!useDefaultStart && !startBeforeEnd);
    }, [useDefaultStart, startBeforeEnd])

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
                    name="end_date"
                    value={end_date}
                    onChange={handleChange}
                    required
                    min={getCurrentMonth()}
                />
            </Form.Group>
            <Form.Group controlId="start-date" className="mt-3">
                <Form.Text className="text-muted">
                    Would you like to start saving for this goal in the future?
                </Form.Text>
                <Form.Check
                    type="switch"
                    checked={!useDefaultStart}
                    onChange={toggleStart}
                />
            </Form.Group>
            <StyledTransitionContainer className={useDefaultStart ? "" : "visible mt-3"}>
                <Form.Group controlId="start-date">
                    <Form.Label>
                        When would you like to start saving for this goal?
                    </Form.Label>
                    <Form.Control
                        type="month"
                        className="form-control"
                        name="start_date"
                        value={start_date}
                        onChange={handleChange}
                        min={getCurrentMonth()}
                        max={end_date}
                        isInvalid={!startBeforeEnd}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Start date must be before end date.
                    </Form.Control.Feedback>
                </Form.Group>
            </StyledTransitionContainer>
        </>
    );
};

export default DescriptionForm;
