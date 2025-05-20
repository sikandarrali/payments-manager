export function ExtractMonthFromDate(isoString) {
    const date = new Date(isoString);
    // getUTCMonth() is zero-based (0=Jan, 1=Feb…), so add 1:
    const monthNumber = date.getUTCMonth() + 1;
    // pad to “02” format:
    return String(monthNumber).padStart(2, '0');
}
