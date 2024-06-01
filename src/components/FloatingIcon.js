import React from 'react';

const FloatingIcon = ({ children, onClick }) => {
    const iconStyle = {
        position: 'fixed',
        cursor: 'pointer',
        bottom: '20px',
        right: '4rem',

    };

    return (
        <div style={iconStyle} onClick={onClick}>
            {children}
        </div>
    );
};

export default FloatingIcon;
