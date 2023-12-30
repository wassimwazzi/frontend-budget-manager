import { Form } from "react-bootstrap";

const AmountForm = ({ amount, updateFields }) => {
    return (
        <Form.Group controlId="description">
            {/* <Form.Label>How much money do you want to save?</Form.Label> */}
            <Form.Control
                type='number'
                name='amount'
                value={amount}
                onChange={(e) => updateFields({ amount: e.target.value })}
                required
            />
            <Form.Text className="text-muted">
                How much money do you want to save?
            </Form.Text>
        </Form.Group>
    );
}

export default AmountForm;
