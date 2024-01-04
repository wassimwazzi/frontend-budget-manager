import { Form } from "react-bootstrap";

const AmountForm = ({ amount, updateFields }) => {
    return (
        <Form.Group controlId="description">
            <Form.Control
                type='number'
                name='amount'
                value={amount}
                min={0}
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
