import React from "react";
import ConfirmModal from "./ConfirmModal";

export const DeleteButton = ({ handleDelete, warningMessage }) => {
    const [showConfirmModal, setShowConfirmModal] = React.useState(false);

    const handleConfirm = () => {
        setShowConfirmModal(false);
        handleDelete();
    };

    return (
        <>
            <button
                onClick={() => setShowConfirmModal(true)}
                className="btn btn-danger ms-2"
            >
                Delete
            </button>
            <ConfirmModal
                show={showConfirmModal}
                message={warningMessage}
                handleClose={() => setShowConfirmModal(false)}
                handleConfirm={handleConfirm}
            />
        </>
    );
}
