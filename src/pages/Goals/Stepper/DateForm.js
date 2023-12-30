import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { getCurrentMonth } from "../../../utils/dateUtils";

const StyledTransitionContainer = styled.div`
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;

  &.visible {
    max-height: 1000px; /* Adjust this value to fit your content height */
    opacity: 1;
  }
`;

const DescriptionForm = ({ start_date, end_date, updateFields }) => {
    const [useDefaultStart, setUseDefaultStart] = useState(true);

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
                    onChange={() => setUseDefaultStart(!useDefaultStart)}
                />
            </Form.Group>
            <StyledTransitionContainer className={useDefaultStart ? "" : "visible mt-3"}>
                <Form.Group controlId="start-date">
                    <Form.Label>
                        When would you like to start saving for this goal?
                    </Form.Label>
                    <input
                        type="month"
                        className="form-control"
                        name="start_date"
                        value={start_date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </StyledTransitionContainer>
        </>
    );
};

export default DescriptionForm;
