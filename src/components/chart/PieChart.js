import { Pie } from 'react-chartjs-2';
import getColorArray from '../../utils/getColorArray';

const getOptions = (title) => (
    {
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
    }
)

const PieChart = ({ data, title }) => {
    if (!data) return;
    const labels = data.labels
    let datasets = data.datasets
    const options = getOptions(title);
    const colors = getColorArray(labels.length);
    datasets = datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`),
        borderColor: colors.map(color => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`),
    })
    );

    const chartData = {
        labels: labels,
        datasets: datasets,
    };

    return (
        <div style={{ overflow: 'auto' }}>
            <Pie data={chartData} options={options} style={{ minHeight: '500px', minWidth: '300px' }} />
        </div>
    );
};

export default PieChart;
