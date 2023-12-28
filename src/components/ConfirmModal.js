import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, message, children, handleClose, handleConfirm }) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children ? children : (
                message ? <p className="text-muted">{message}</p> :
                    <p className="text-muted">Click confirm to continue, or cancel to go back.</p>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
                Confirm
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ConfirmModal;

export const getConfirmation = (message) => {
    // returns a promise that resolves when the user confirms, and rejects when they cancel
    return new Promise((resolve, reject) => {
        const modal = (
            <ConfirmModal
                show={true}
                message={message}
                handleClose={() => {
                    modalInstance.close();
                    reject();
                }}
                handleConfirm={() => {
                    modalInstance.close();
                    resolve();
                }}
            />
        );

        const modalInstance = window.createReactModal(modal);
    });
}



/**
 * // Modal
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ show, title, children, handleClose, handleConfirm, confirmMessage, cancelMessage }) => {
    const ModalLayout = (
        <BootstrapModal show={show} onHide={handleClose} centered>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {children}
            </BootstrapModal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {cancelMessage ? cancelMessage : 'Cancel'}
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    {confirmMessage ? confirmMessage : 'Confirm'}
                </Button>
            </Modal.Footer>
        </BootstrapModal>
    )
    return new Promise((resolve, reject) => {
        const modalInstance = window.createReactModal(ModalLayout);
        modalInstance.onClose = reject;
        modalInstance.onConfirm = resolve;
    });
};

export default Modal;


 */