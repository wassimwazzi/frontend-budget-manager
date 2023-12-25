import React, { useState } from 'react';
import './HorizontalAccordion.css';

const HorizontalAccordion2 = ({ panels }) => {
    const [activePanel, setActivePanel] = useState(0);

    const togglePanel = (index) => {
        setActivePanel(activePanel === index ? 0 : index);
    };

    return (
        <div className="horizontal-accordion">
            {panels.map((panel, index) => (
                <div
                    key={index}
                    className={`accordion-panel ${activePanel === index ? 'active' : ''}`}
                    onClick={() => togglePanel(index)}
                >
                    <div className="panel-header">{panel.header}</div>
                    <div className="panel-content">{panel.content}</div>
                </div>
            ))}
        </div>
    );
};

const HorizontalAccordion = ({ titles, children, ...props }) => {
    const [activePanel, setActivePanel] = useState(0);

    const togglePanel = (index) => {
        setActivePanel(activePanel === index ? -1 : index);
    };

    return (
        <div className="horizontal-accordion">
            {titles.map((title, index) => (
                <div
                    key={index}
                    className={`accordion accordion-flush accordion-panel ${activePanel === index ? 'active' : ''}`}
                    onClick={() => togglePanel(index)}
                >
                    <div className={`panel-header ${activePanel === index ? 'active' : ''}`}>
                        {activePanel === index ? '▼ ' : '► '}
                        {title}
                    </div>
                    {activePanel === index && <div className="panel-content">{children[index]}</div>}
                </div>
            ))}
        </div>
    );
};

export default HorizontalAccordion;
