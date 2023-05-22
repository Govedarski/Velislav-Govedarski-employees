export function stringToDate(stringDate, format) {
    if (stringDate === undefined){
        return
    }

    format = format.toLowerCase();
    let day = stringDate.substring(format.indexOf('dd'), format.indexOf('dd') + 2);
    let month = stringDate.substring(format.indexOf('mm'), format.indexOf('mm') + 2);
    let year = stringDate.substring(format.indexOf('yyyy'), format.indexOf('yyyy') + 4);
    return new Date(year, month - 1, day);
}

export function calculateDaysWorkedTogether(pair) {
    const dateFrom = pair.employee1DateFrom > pair.employee2DateFrom
        ? pair.employee1DateFrom
        : pair.employee2DateFrom;
    const dateTo = pair.employee1DateTo < pair.employee2DateTo
        ? pair.employee1DateTo
        : pair.employee2DateTo;
    // Difference in days between two dates https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    pair.daysWorked = Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24));
}