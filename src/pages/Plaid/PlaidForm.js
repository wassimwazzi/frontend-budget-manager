import React, { useState, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { usePlaidLink } from 'react-plaid-link';
import api from '../../api';
import Status from '../../components/Status';

const LookbackDaysModal = ({ show, onSubmit, onClose, lookbackDays, setLookbackDays }) => {
    const [useAllData, setUseAllData] = useState(true);

    const handleUseAllDataChange = (e) => {
        setUseAllData(e.target.checked);
        if (e.target.checked) {
            setLookbackDays(null);
        }
    };

    const handleCustomChange = (e) => {
        setUseAllData(!e.target.checked);
    }

    const handleLookbackDaysChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setLookbackDays(Math.max(0, Math.min(365, value))); // Ensure lookback days are between 0 and 365
        }
    };

    return (
        <Modal show={show}>
            <Modal.Body>
                <p>
                    Would you like to sync all available historical transactions, or set a custom range?
                </p>
                <Form>
                    <Form.Group controlId="allData">
                        <Form.Check
                            type="radio"
                            label="Use all historical data"
                            checked={useAllData}
                            onChange={handleUseAllDataChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="custom">
                        <Form.Check
                            type="radio"
                            label="Custom"
                            checked={!useAllData}
                            onChange={handleCustomChange}
                        />
                    </Form.Group>
                    {!useAllData && (
                        <Form.Group controlId="lookbackDays">
                            <Form.Label>Lookback Days</Form.Label>
                            <Form.Control
                                type="number"
                                value={lookbackDays}
                                onChange={handleLookbackDaysChange}
                                max={365}
                                min={0}
                            />
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Apply
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const getExistingItems = async () => {
    let existingItems = [];
    let error = null;
    let nextUrl = '/api/plaiditem/';

    try {
        while (nextUrl) {
            const { data } = await api.get(nextUrl);
            existingItems = existingItems.concat(data.results);
            nextUrl = data.next;
        }
    } catch (e) {
        console.error('Error fetching items:', e.response);
        error = e;
    }

    return { existingItems, error };
};


const PlaidForm = ({ linkToken, buttonText = "Link New Account", ...props }) => {
    const [showModal, setShowModal] = useState(false);
    const [lookbackDays, setLookbackDays] = useState(null);
    const [status, setStatus] = useState({ loading: false, successMessage: null, errorMessage: null });

    const onSuccess = useCallback((public_token, metadata) => {
        // Validate that the item does not already exist
        // call getExistingItems and check if the institution_id is already in the list
        // if it is, set an error message and return
        // otherwise, set the access token
        let processItem = true;
        setStatus({ loading: false, successMessage: null, errorMessage: null });

        getExistingItems().then(({ existingItems, error }) => {
            if (error) {
                console.error('Error fetching existing items:', error);
                setStatus({ loading: false, successMessage: null, errorMessage: "An error occurred while fetching existing items" });
                return;
            }
            for (let item of existingItems) {
                console.log(item.institution_id === metadata.institution.institution_id)
                if (item.institution_id === metadata.institution.institution_id) {
                    processItem = false;
                    break;
                }
            }
            if (!processItem) {
                console.error('Item already exists');
                setStatus({ loading: false, successMessage: null, errorMessage: "This account has already been linked" });
                return;
            }
            api
                .post('/api/plaiditem/exchange_public_token/', { public_token })
                .catch(error => {
                    console.error('Error setting access token:', error.response)
                });
        });
    }, []);

    const config = {
        token: linkToken,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);
    const onSubmit = () => {
        setShowModal(false);
        open();
    }
    console.log(status)
    return (
        <>
            <Button onClick={() => setShowModal(true)} disabled={!ready} {...props}>
                {buttonText}
            </Button>
            <Status {...status} />
            <LookbackDaysModal
                show={showModal}
                onSubmit={onSubmit}
                onClose={() => setShowModal(false)}
                lookbackDays={lookbackDays}
                setLookbackDays={setLookbackDays}
            />
        </>
    );
};

export default PlaidForm;