import React from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem } from "./BreadCrumbs";

const BackLink = ({ name, href, active = true }) => {
    const props = {};
    if (active) {
        props.active = 'true';
    }
    return (
        <div className="d-flex align-items-center mb-2" onClick={() => window.location.href = href} style={{ cursor: 'pointer', width: 'fit-content' }}>
            <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
            <BreadcrumbItem {...props}>
                {name}
            </BreadcrumbItem>
        </div>
    )
};

export default BackLink;
