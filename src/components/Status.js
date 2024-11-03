import React, { createContext, useState, useContext } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState({ message: '', type: '' });

    const hideStatus = () => {
        setStatus({ message: '', type: '' });
    }

    const showStatus = (message, type, duration) => {
        setStatus({ message, type });
        duration = duration || 1_000
        if (duration !== 'permanent') {
            const timeoutId = setTimeout(() => {
                hideStatus();
            }, duration);
            return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
        }
    };

    return (
        <StatusContext.Provider value={{ status, showStatus, hideStatus }}>
            <Status />
            {children}
        </StatusContext.Provider>
    );
};

export const useStatus = () => {
    return useContext(StatusContext);
};

const Status = () => {
    const { status, hideStatus } = useStatus();

    const getStatusStyle = () => {
        switch (status.type) {
            case 'success':
                return 'alert alert-success';
            case 'error':
                return 'alert alert-danger';
            case 'warning':
                return 'alert alert-warning';
            default:
                return 'alert alert-info';
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                minWidth: '300px',
                width: '50%',
                textAlign: 'center',
                display: status.message ? 'flex' : 'none',
                justifyContent: 'center',
                borderRadius: '1rem',
                zIndex: 1000,
                transform: 'translateX(-50%)',
                left: '50%',
            }}
            className={getStatusStyle()}
            role="alert"
        >
            <button
                style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                }}
                onClick={hideStatus}
                aria-label="Close"
            >
                &times;
            </button>
            <div style={{ maxWidth: '80%' }}>
                {status.message}
            </div>
        </div>
    );
};

export default Status;
