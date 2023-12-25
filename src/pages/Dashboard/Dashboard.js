import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import MonthlySummary from "./MonthlySummary";
import HistoricalSummary from "./HistoricalSummary";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('first');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container className="">
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="first" title="Monthly Summary">
                    <Container className="mt-4 p-4">
                        <MonthlySummary />
                    </Container>
                </Tab>
                <Tab eventKey="second" title="Historical Summary">
                    <Container className="mt-4 p-4">
                        <HistoricalSummary />
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Dashboard;
