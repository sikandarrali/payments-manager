export function GetMonthNameYearFromDateObject({ month, year }) {
    // JS Date months are 0-indexed, so subtract 1
    const date = new Date(year, Number(month) - 1);
    // get full month name + year
    return date.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric'
    });
}
