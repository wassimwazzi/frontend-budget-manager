export const getCurrentMonth = () => {
    // month in YYYY-MM format
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
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

export const offsetMonth = (currentMonth, offset) => {
    // NOTE This was way harder than it should be. (That's what she said)
    // currentMonth is in YYYY-MM format
    let [year, month] = currentMonth.split('-').map(Number);
    let zeroIndexMonth = month - 1
    year += Math.floor((zeroIndexMonth + offset) / 12)
    // always get a positive remainder
    zeroIndexMonth = ((zeroIndexMonth + offset) % 12 + 12) % 12
    month = zeroIndexMonth + 1
    month = month.toString().padStart(2, '0');

    return `${year}-${month}`;
}
