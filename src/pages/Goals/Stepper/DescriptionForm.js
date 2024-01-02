import React, { useState } from "react";
import { Form } from "react-bootstrap";

const MaxChars = 255;

const DescriptionForm = ({ description, updateFields }) => {
    const [charsLeft, setCharsLeft] = useState(MaxChars);

    function handleChange(e) {
        const input = e.target.value;
        updateFields({ description: input });
        setCharsLeft(MaxChars - input.length);
    }

    return (
        <Form.Group controlId="description">
            <textarea
                className="form-control"
                placeholder="Enter a description"
                value={description}
                onChange={handleChange}
                maxLength={MaxChars}
                required
            />
            <Form.Text className="text-muted">
                {charsLeft} / {MaxChars} characters
            </Form.Text>
        </Form.Group>
    );
}

export default DescriptionForm;
