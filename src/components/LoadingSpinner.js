// LoadingSpinner.js
import React from 'react';
import { CircleLoader } from 'react-spinners';


const LoadingSpinner = ({ loading }) => {
    return (
        <div className="sweet-loading mx-3">
            <CircleLoader color={'#36D7B7'} loading={loading} />
        </div>
    );
};

export default LoadingSpinner;

/**
 * import React, { useState, useEffect } from 'react';
import { CircleLoader } from 'react-spinners';

const LoadingSpinner = ({ loading, timeout = 5000, failureMessageDuration = 5000 }) => {
    const [status, setStatus] = useState(loading ? 'loading' : 'idle');

    useEffect(() => {
        let timer;
        if (loading) {
            setStatus('loading');
            timer = setTimeout(() => {
                setStatus('failed');
                timer = setTimeout(() => {
                    setStatus('idle');
                }, failureMessageDuration);
            }, timeout);
        } else {
            setStatus('idle');
        }

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or if loading changes
    }, [loading, timeout, failureMessageDuration]);

    return (
        <div className="sweet-loading mx-3">
            {status === 'loading' && <CircleLoader color={'#36D7B7'} loading={true} />}
            {status === 'failed' && <p style={{ color: 'red' }}>Failed to load</p>}
        </div>
    );
};

export default LoadingSpinner;

 */