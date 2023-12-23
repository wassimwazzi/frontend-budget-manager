// LoadingSpinner.js
import React from 'react';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';


const LoadingSpinner = ({ loading }) => {
    return (
        <div className="sweet-loading mx-3">
            <CircleLoader color={'#36D7B7'} loading={loading} />
        </div>
    );
};

export default LoadingSpinner;
