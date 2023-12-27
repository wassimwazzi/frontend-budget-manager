export const getCurrentMonth = (monthOffset = 0) => {
    // month in YYYY-MM format
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    // Months are zero-based, so we add 1 to get the current month
    let month = (currentDate.getMonth() + monthOffset);
    year += Math.floor(month / 12);
    month = month % 12;
    // Months are zero-based, so we add 1 to get the current month
    month = (month + 1).toString().padStart(2, '0');

    return `${year}-${month}`;
};

export const getCurrentYear = () => (
    new Date().getFullYear()
);

export const getCurrentDay = () => (
    new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
);

