import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    // CategoryScale,
    // LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};

const getColorArray = (numColors) => {
    const colors = [];
    const step = 360 / numColors;

    for (let i = 0; i < numColors; i++) {
        const hue = i * step;
        const color = HSLToRGB(hue, 100, 50);
        colors.push(color);
    }

    return colors;
};

const PieChart = ({ datasets, labels, title }) => {
    const options = {
        responsive: true,
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
        <Pie data={chartData} options={options} />
    );
};

export default PieChart;
