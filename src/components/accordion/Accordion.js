import React from "react";
import { Accordion as AccordionBootstrap, Card } from "react-bootstrap";

const Accordion = ({ children, open = true, ...props }) => {
    if (!children.length) {
        children = [children];
    }
    const defaultActiveKey = open ? children.map((_, index) => `${index}`) : [];
    return (
        <AccordionBootstrap
            defaultActiveKey={defaultActiveKey}
            {...props}
            alwaysOpen
        >
            {children.map((child, index) => (
                <Card className="border-0 shadow-lg mb-3" key={index}>
                    <AccordionBootstrap.Item eventKey={`${index}`}>
                        <AccordionBootstrap.Header>
                            <h5 className="mb-0">
                                <span className="text-secondary">{child.props.title}</span>
                            </h5>
                        </AccordionBootstrap.Header>
                        <AccordionBootstrap.Body>{child}</AccordionBootstrap.Body>
                    </AccordionBootstrap.Item>
                </Card>
            ))}
        </AccordionBootstrap>
    )
};

export default Accordion;
