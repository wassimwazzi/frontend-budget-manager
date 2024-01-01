import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';


const ProgressChart = ({ progress, style }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        radius: '100%'
    }
    const colors = [
        [64, 254, 90],
        [254, 69, 69],
    ];
    const chartData = {
        labels: [],
        datasets: [
            {
                data: [progress, 100 - progress],
                backgroundColor: colors.map(color => `rgba(${color}, 1)`),
                borderColor: colors.map(color => `rgba(${color}, 0.5)`),
            },
        ],
    };

    return (
        <div style={{ overflow: 'auto' }}>
            <Doughnut data={chartData} options={options} style={style} />
        </div>
    );
};

export default ProgressChart;
