// import { Fade } from "react-bootstrap";
import React, { createContext, useState, useContext } from "react";

// const FadeOut = ({ children, delay = 10_000 }) => {
//     const [show, setShow] = React.useState(true);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setShow(false);
//         }, delay);
//         return () => clearTimeout(timeout);
//     }, [delay]);

//     return (
//         <Fade in={show} unmountOnExit={true}>
//             <div>{children}</div>
//         </Fade>
//     );
// };

// const Status = ({ loading, successMessage, errorMessage }) => {
//     if (loading) {
//         return <LoadingSpinner loading={loading} />
//     }
//     if (successMessage) {
//         return (
//             <FadeOut>
//                 <div className='alert alert-success' role='alert'>
//                     {successMessage}
//                 </div>
//             </FadeOut>
//         )
//     }
//     if (errorMessage) {
//         return (
//             <FadeOut>
//                 <div className='alert alert-danger' role='alert'>
//                     {errorMessage}
//                 </div>
//             </FadeOut>
//         )
//     }
//     return <></>
// };

// export default Status;


const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState({ message: '', type: '' });

    const showStatus = (message, type) => {
        setStatus({ message, type });
        setTimeout(() => {
            setStatus({ message: '', type: '' });
        }, 7000);
    };

    return (
        <StatusContext.Provider value={{ status, showStatus }}>
            <Status />
            {children}
        </StatusContext.Provider>
    );
};

export const useStatus = () => {
    return useContext(StatusContext);
};

const Status = () => {
    const { status } = useStatus();

    const getStatusStyle = () => {
        switch (status.type) {
            case 'success':
                return 'alert alert-success';
            case 'error':
                return 'alert alert-danger';
            default:
                return 'alert alert-info';
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                width: '50%',
                textAlign: 'center',
                padding: '1rem',
                display: status.message ? 'block' : 'none',
                zIndex: 1000, // Ensure this is on top of other content
                // center the div
                transform: 'translateX(-50%)',
                left: '50%',
            }}
            className={getStatusStyle()}
            role="alert"
        >
            {status.message}
        </div>
    );
};

export default Status;
