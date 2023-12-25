import React from "react";
import { Accordion, Card } from "react-bootstrap";

const PlotContainer = ({ children, ...props }) => {
    if (!children.length) {
        children = [children];
    }
    return (
        <Accordion
            defaultActiveKey={children.map((_, index) => `${index}`)} // open all panels by default
            {...props}
            alwaysOpen
        >
            {children.map((child, index) => (
                <Card className="border-0 shadow-lg mb-3">
                    <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header>
                            <h5 className="mb-0">
                                <span className="text-secondary">{child.props.title}</span>
                            </h5>
                        </Accordion.Header>
                        <Accordion.Body>{child}</Accordion.Body>
                    </Accordion.Item>
                </Card>
            ))}
        </Accordion>
    )
};

export default PlotContainer;
