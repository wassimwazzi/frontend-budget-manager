import React from 'react';
import { ProgressBar as ProgressBarBootstrap } from 'react-bootstrap';

const ProgressBar = ({ progress, progressVariant = "success", remainingVariant = "warning" }) => {
    const remaining = 100 - progress;
    return (
        <ProgressBarBootstrap>
            <ProgressBarBootstrap variant={progressVariant} now={progress} key={1} label={`${progress.toFixed(0)}%`} />
            <ProgressBarBootstrap striped variant={remainingVariant} now={remaining} key={2} />
        </ProgressBarBootstrap>
    );
};

export default ProgressBar;
