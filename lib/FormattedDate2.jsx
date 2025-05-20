export function FormattedDate2(isoString) {
    const date = new Date(isoString);
    // extract day, month, year in local time
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}