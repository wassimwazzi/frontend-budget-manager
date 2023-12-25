export const getCurrentMonth = () => {
    // month in YYYY-MM format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Months are zero-based, so we add 1 to get the current month
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
};

export const getCurrentYear = () => (
    new Date().getFullYear()
);

export const getCurrentDay = () => (
    new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
);

