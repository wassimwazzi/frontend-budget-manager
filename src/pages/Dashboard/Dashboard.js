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
        <Container className="mt-4">
            <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
                <Tab eventKey="first" title="Monthly Summary">
                    <MonthlySummary />
                </Tab>
                <Tab eventKey="second" title="Historical Summary">
                    <HistoricalSummary />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Dashboard;
