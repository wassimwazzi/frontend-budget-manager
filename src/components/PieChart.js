import { Pie } from 'react-chartjs-2';
import getColorArray from '../utils/getColorArray';

const PieChart = ({ datasets, labels, title }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            }
        },
        radius: '70%'
    };
    const colors = getColorArray(labels.length);
    const data = datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`),
        borderColor: colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`),
    })
    );

    const chartData = {
        labels: labels,
        datasets: data,
    };

    return (
        <div style={{ height: '100vh', width: 'auto' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
