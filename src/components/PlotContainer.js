import React from "react";
import { Accordion, Card } from "react-bootstrap";

const PlotContainer = ({ title, children, ...props }) => (
    <Accordion defaultActiveKey="0" {...props}>
        <Card className="border-0 shadow-lg mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <h5 className="mb-0">
                        <span className="text-secondary">{title}</span>
                    </h5>
                </Accordion.Header>
                <Accordion.Body>{children}</Accordion.Body>
            </Accordion.Item>
        </Card>
    </Accordion>
);

export default PlotContainer;
