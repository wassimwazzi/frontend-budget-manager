import React from 'react';
import { ProgressBar as ProgressBarBootstrap } from 'react-bootstrap';

const ProgressBar = ({ progress }) => {
    return (
        <ProgressBarBootstrap>
            <ProgressBarBootstrap variant="success" now={progress} key={1} label={`${progress}%`} />
            <ProgressBarBootstrap striped variant="danger" now={100 - progress} key={2} />
        </ProgressBarBootstrap>
    );
};

export default ProgressBar;
