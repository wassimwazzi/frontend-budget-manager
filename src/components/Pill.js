import React from 'react';

const Pill = ({ text }) => {
    const style = {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '16px',
        lineHeight: '1',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '50px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    };

    return (
        <div style={style}>
            {text}
        </div>
    );
};

export default Pill;