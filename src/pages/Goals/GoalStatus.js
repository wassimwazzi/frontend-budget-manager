import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPersonDigging, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Alert } from "react-bootstrap";
import api from "../../api";
import extractErrorMessageFromResponse from "../../utils/extractErrorMessageFromResponse";
import "./css/GoalStatus.css";

const GoalStatusTypes = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
};

const FinalizeGoalModal = ({ show, handleClose, handleConfirm, successMessage, errorMessage, goalId }) => (
    <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "2.5rem", color: "#f39c12" }}>
                🎉 Goal Completed 🎉
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                You've successfully completed your goal. Click on Confirm to mark this goal as completed. <br />
                We will automatically adjust your contributions so your savings go to your other goals.
            </p>
            <p className="small-text text-muted">
                Note: This goal cannot be edited once marked as completed.
            </p>
            {successMessage && (
                <Alert variant="success" className="success-alert">
                    <Alert.Heading>
                        Success!
                    </Alert.Heading>
                    <p>{successMessage}</p>
                    <p>
                        Click here to view your <Alert.Link href={`/goals/${goalId}`}>goal</Alert.Link>
                    </p>
                </Alert>
            )}
            {errorMessage && (
                <Alert variant="danger" className="error-alert">
                    <p>{errorMessage}</p>
                </Alert>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleConfirm} disabled={successMessage}>
                Confirm
            </Button>
        </Modal.Footer>
    </Modal>
);

const ActionRequiredStatus = ({ goal }) => {
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleConfirm = () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        api
            .post(`/api/goals/${goal.id}/finalize/`)
            .then(() => {
                setSuccessMessage("Goal successfully marked as completed!");
            })
            .catch((error) => {
                setErrorMessage(extractErrorMessageFromResponse(error));
            });
    };

    return (
        <>
            <div className="goal-status-container action-required" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
                <Icon icon={faTriangleExclamation} color="#FFD600" />
                <div>
                    <h3 className="mb-0">Action Required</h3>
                    <p className="small-text">Click on View Details to mark goal as completed</p>
                </div>
            </div>
            <FinalizeGoalModal
                show={showModal} handleClose={handleCancel} handleConfirm={handleConfirm}
                successMessage={successMessage} errorMessage={errorMessage} goalId={goal.id}
            />
        </>
    );
}

const Icon = ({ icon, color = "white" }) => (
    <div className="icon">
        <FontAwesomeIcon icon={icon} size="2x" color={color} />
    </div>
);

const GoalStatus = ({ goal }) => {
    if (goal.status === GoalStatusTypes.COMPLETED) {
        return (
            <div className="goal-status-container completed">
                <Icon icon={faCheckCircle} color="#4CAF50" />
                <h3>Goal Completed</h3>
            </div>
        );
    }
    if (goal.status === GoalStatusTypes.FAILED) {
        return (
            <div className="goal-status-container failed">
                <Icon icon={faCircleXmark} color="#FF5252" />
                <h3>Goal Failed</h3>
            </div>
        );
    }
    if (goal.progress === 100) {
        return <ActionRequiredStatus goal={goal} />
    }
    return (
        <div className="goal-status-container in-progress">
            <Icon icon={faPersonDigging} color="#2196F3" />
            <h3>In Progress</h3>
        </div>
    );
};

export default GoalStatus;
