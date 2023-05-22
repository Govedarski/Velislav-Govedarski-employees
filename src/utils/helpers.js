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