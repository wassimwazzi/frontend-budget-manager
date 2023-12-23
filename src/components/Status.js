import LoadingSpinner from "./LoadingSpinner";

const Status = ({ loading, successMessage, errorMessage }) => {
    if (loading) {
        return <LoadingSpinner loading={loading} />
    }
    if (successMessage) {
        return (
            <div className='alert alert-success mx-3' role='alert'>
                {successMessage}
            </div>
        )
    }
    if (errorMessage) {
        return (
            <div className='alert alert-danger mx-3' role='alert'>
                {errorMessage}
            </div>
        )
    }
    return <></>
};

export default Status;