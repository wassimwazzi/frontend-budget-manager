import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons';

const SortModal = ({ n, setN, setSortType, maxN }) => {
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setN(e.target.value);
    }

    const handleSortType = (e) => {
        setSortType(e.target.value);
    }

    const handleApply = () => {
        setShowModal(false);
    }

    const handleReset = () => {
        // set n to length of labels
        setN(maxN);
        setShowModal(false);
    }

    return (
        <>
            <Button variant="link" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faGear} />
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Choose top/bottom n labels:</Form.Label>
                            <Form.Control type="number" min="1" max={maxN} onChange={handleChange} value={n} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sort Type:</Form.Label>
                            <Form.Control as="select" onChange={handleSortType}>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleApply}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
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
        const indices = {};
        datasets[0].data.forEach((value, index) => {
            indices[value] = index;
        });
        const sortedData = datasets[0].data.slice().sort((a, b) => a - b);
        const sortedLabels = sortedData.map(value => labels[indices[value]]);
        setSortedData(sortedData);
        setSortedLabels(sortedLabels);
        setDisplayedData(datasets);
        setDisplayedLabels(labels);
    }, [datasets, labels]);

    useEffect(() => {
        if (n === null) return;
        const data = datasets
        let newLabels = sortedLabels;
        if (sortType === 'bottom') {
            data[0].data = sortedData.slice(0, n);
            newLabels = sortedLabels.slice(0, n);
        } else {
            data[0].data = sortedData.slice(-n);
            newLabels = sortedLabels.slice(-n);
        }
        setDisplayedData(data);
        setDisplayedLabels(newLabels);
    }, [n, sortType, datasets, sortedData, sortedLabels]);

    return (
        <>
            <SortModal setN={setN} setSortType={setSortType} maxN={labels.length} n={n} />

            <div className="mt-4">
                <ChartComponent data={{ datasets: displayedData, labels: displayedLabels }} {...chartProps} />
            </div>
        </>
    );

}

export default SortableChart;