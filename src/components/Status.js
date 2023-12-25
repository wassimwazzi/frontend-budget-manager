import LoadingSpinner from "./LoadingSpinner";
import { Fade } from "react-bootstrap";
import React, { useEffect } from "react";

const FadeOut = ({ children, delay = 10_000 }) => {
    const [show, setShow] = React.useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <Fade in={show} unmountOnExit={true}>
            <div>{children}</div>
        </Fade>
    );
};

const Status = ({ loading, successMessage, errorMessage }) => {
    if (loading) {
        return <LoadingSpinner loading={loading} />
    }
    if (successMessage) {
        return (
            <FadeOut>
                <div className='alert alert-success' role='alert'>
                    {successMessage}
                </div>
            </FadeOut>
        )
    }
    if (errorMessage) {
        return (
            <FadeOut>
                <div className='alert alert-danger' role='alert'>
                    {errorMessage}
                </div>
            </FadeOut>
        )
    }
    return <></>
};

export default Status;