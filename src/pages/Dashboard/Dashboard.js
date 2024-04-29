import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import MonthlySummary from "./MonthlySummary";
import HistoricalSummary from "./HistoricalSummary";
import PlaidLink from "../Plaid/Plaid";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('first');

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
            <Tab eventKey="first" title="Monthly Summary">
                <Container className="mt-4 p-4">
                    <PlaidLink />
                    <MonthlySummary />
                </Container>
            </Tab>
            <Tab eventKey="second" title="Historical Summary">
                <Container className="mt-4 p-4">
                    <HistoricalSummary />
                </Container>
            </Tab>
        </Tabs>
    );
};

export default Dashboard;
