import React, { useState, useCallback, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { usePlaidLink } from 'react-plaid-link';
import api from '../../api';
import { useStatus } from '../../components/Status';

const LookbackDateModal = ({ show, onSubmit, onClose, lookbackDate, setLookbackDate }) => {
    const [useAllData, setUseAllData] = useState(true);
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    const handleUseAllDataChange = (e) => {
        setUseAllData(e.target.checked);
        if (e.target.checked) {
            setLookbackDate(null);
        }
    };

    const handleClose = () => {
        makeScrollable();
        onClose();
    };

    const handleCustomChange = (e) => {
        setUseAllData(!e.target.checked);
    }

    const handlelookbackDateChange = (e) => {
        setLookbackDate(e.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={(e) => { e.preventDefault(); makeScrollable(); onSubmit(); }}>
                <Modal.Body>
                    <p>
                        Would you like to sync all available historical transactions, or set a custom range?
                    </p>
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
                        <Form.Group controlId="lookbackDate">
                            <Form.Label>Oldest Lookback Date</Form.Label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={lookbackDate ? lookbackDate : today.toISOString().split('T')[0]}
                                onChange={handlelookbackDateChange}
                                min={oneYearAgo.toISOString().split('T')[0]}
                                max={today.toISOString().split('T')[0]}
                                required={!useAllData}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Apply
                    </Button>
                </Modal.Footer>
            </Form>
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

const makeScrollable = () => {
    document.body.style.overflow = 'auto';
};

const PlaidForm = ({ linkToken, buttonText = "Link New Account", ...props }) => {
    const [showModal, setShowModal] = useState(false);
    const [lookbackDate, setLookbackDate] = useState(null);
    const { showStatus } = useStatus();
    const lookbackDateRef = useRef(lookbackDate);

    useEffect(() => {
        lookbackDateRef.current = lookbackDate;
    }, [lookbackDate]);

    const onSuccess = useCallback((public_token, metadata) => {
        // Validate that the item does not already exist
        // call getExistingItems and check if the institution_id is already in the list
        // if it is, set an error message and return
        // otherwise, set the access token
        let processItem = true;

        getExistingItems().then(({ existingItems, error }) => {
            if (error) {
                console.error('Error fetching existing items:', error);
                showStatus('An error occurred while linking the account', 'error');
                return;
            }
            for (let item of existingItems) {
                if (item.institution_id === metadata.institution.institution_id) {
                    processItem = false;
                    break;
                }
            }
            if (!processItem) {
                console.error('Item already exists');
                showStatus('This account has already been linked', 'error');
                return;
            }
            api
                .post('/api/plaiditem/exchange_public_token/', { public_token, metadata, lookback_date: lookbackDateRef.current })
                .then(response => {
                    const newTransactionCount = response.data.added.length;
                    let statusMessage = 'Account linked successfully!'
                    if (newTransactionCount > 0) {
                        statusMessage += ` ${newTransactionCount} transactions have been added,  refresh the page to view them.`
                    }
                    showStatus(statusMessage, 'success');
                })
                .catch(error => {
                    console.error('Error setting access token:', error.response)
                    showStatus('An error occurred while linking the account', 'error');
                });
        });
    }, [showStatus]);

    const onExit = useCallback((error, metadata) => {
        if (error) {
            console.error('Error during Plaid Link:', error, metadata);
            showStatus('An error occurred during the Plaid Link process', 'error');
        }
    }, [showStatus]);

    const config = {
        token: linkToken,
        onSuccess,
        onExit,
    };
    const { open, ready } = usePlaidLink(config);
    const onSubmit = () => {
        setShowModal(false);
        open();
    }
    // TODO: BUG when error on create, and opening Link again immediately gives error message again.
    return (
        <>
            <Button onClick={() => setShowModal(true)} disabled={!ready} {...props}>
                {buttonText}
            </Button>
            <LookbackDateModal
                show={showModal}
                onSubmit={onSubmit}
                onClose={() => setShowModal(false)}
                lookbackDate={lookbackDate}
                setLookbackDate={setLookbackDate}
            />
        </>
    );
};

export default PlaidForm;