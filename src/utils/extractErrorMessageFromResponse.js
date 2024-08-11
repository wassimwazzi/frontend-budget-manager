const extractErrorMessageFromResponse = (error, fields = {}, defaultMessage) => {
    if (error.response?.status === 400) {
        // make error message bullet list
        const errors = []
        for (const key in error.response.data) {
            if (key in fields) {
                errors.push(`${key}: ${error.response.data[key]}`)
            } else {
                errors.push(error.response.data[key])
            }
        }
        return errors.join('\n') || defaultMessage || 'An error occurred. Please try again later.'
    }
    else {
        return defaultMessage || 'An error occurred. Please try again later.'
    }
}

export default extractErrorMessageFromResponse;