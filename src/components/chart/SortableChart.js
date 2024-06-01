import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const SortOptions = ({ n, setN, setSortType, maxN }) => {
    const handleChange = (e) => {
        setN(e.target.value);
    }

    const handleSortType = (e) => {
        setSortType(e.target.value);
    }

    const handleReset = () => {
        // set n to length of labels
        setN(maxN);
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)', overflow: 'scroll' }} className="mt-3">
            <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Choose top/bottom n labels:
                </Form.Label>
                <Form.Control type="number" min="1" max={maxN} onChange={handleChange} value={n ? n : ''} style={{ width: '100px', border: '1px solid #ccc', borderRadius: '5px', padding: '8px', outline: 'none', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
            </Form.Group>
            <Form.Group style={{ display: 'flex', alignItems: 'center' }} className="ms-3">
                <Form.Label style={{ marginRight: '10px', fontWeight: 'bold' }}>Sort Type:</Form.Label>
                <Form.Control as="select" onChange={handleSortType} style={{ width: '100px', border: '1px solid #ccc', borderRadius: '5px', padding: '8px', outline: 'none', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </Form.Control>
            </Form.Group>
            <button onClick={handleReset} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }} className="button ms-3">Reset</button>
        </div>

    )
}

const sortData = (datasets, labels) => {
    if (datasets.length > 1) {
        // then this is a bar chart with multiple datasets
        // sort by total value of each dataset
        const sortedData = datasets.sort((a, b) => {
            const totalA = a.data.reduce((acc, curr) => acc + curr, 0);
            const totalB = b.data.reduce((acc, curr) => acc + curr, 0);
            return totalA - totalB; // ascending order
        });
        return { sortedData, sortedLabels: labels };
    } else {
        // then this is a pie chart with one dataset
        const combinedData = datasets[0].data.map((value, index) => ({ value, label: labels[index] }));
        combinedData.sort((a, b) => a.value - b.value);
        const sortedData = combinedData.map(item => item.value);
        const sortedLabels = combinedData.map(item => item.label);
        return { sortedData, sortedLabels };
    }
}

const sliceData = (datasets, labels, n, sortType) => {
    if (n === null) return { datasets, labels };
    let data, newLabels;
    if (sortType === 'bottom') {
        data = datasets.slice(0, n);
        newLabels = labels.slice(0, n);
    }
    else {
        data = datasets.slice(-n);
        newLabels = labels.slice(-n);
    }
    return { data, newLabels };
}

const SortableChart = ({ datasets, labels, ChartComponent, ...chartProps }) => {
    const [n, setN] = useState(null);
    const [sortType, setSortType] = useState('top');
    const [sortedData, setSortedData] = useState([]);
    const [sortedLabels, setSortedLabels] = useState([]);
    const [displayedData, setDisplayedData] = useState([datasets]);
    const [displayedLabels, setDisplayedLabels] = useState([labels]);

    useEffect(() => {
        if (datasets.length === 0) return;
        const { sortedData, sortedLabels } = sortData(datasets, labels);
        setSortedData(sortedData);
        setSortedLabels(sortedLabels);
        setDisplayedData(datasets);
        setDisplayedLabels(labels);
    }, [datasets, labels]);

    useEffect(() => {
        if (n === null || datasets.length === 0) return;
        const { data, newLabels } = sliceData(sortedData, sortedLabels, n, sortType);
        if (datasets.length > 1) {
            // then this is a bar chart with multiple datasets
            // filter out datasets that are not in data
            setDisplayedData(data);
            setDisplayedLabels(sortedLabels);
        } else {
            // then this is a pie chart with one dataset
            const newData = datasets
            newData[0].data = data;
            setDisplayedData(newData);
            setDisplayedLabels(newLabels);
        }
    }, [n, sortType, datasets, sortedData, sortedLabels]);

    return (
        <>
            <SortOptions setN={setN} setSortType={setSortType} maxN={datasets.length > 1 ? datasets.length : labels.length} n={n} />

            <div className="mt-4">
                <ChartComponent data={{ datasets: displayedData, labels: displayedLabels }} {...chartProps} />
            </div>
        </>
    );

}

export default SortableChart;