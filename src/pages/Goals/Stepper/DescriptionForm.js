import { Form } from "react-bootstrap";

const DescriptionForm = ({ description, updateFields }) => {
    return (
        <Form.Group controlId="description">
            <Form.Label>Enter a description about your goal</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => updateFields({ description: e.target.value })}
                required
            />
        </Form.Group>
    );
}

export default DescriptionForm;
