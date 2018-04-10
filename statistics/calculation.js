function getDate(d) {
    return Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
}

function getDateFromDateKey(k) {
    return new Date(k * (1000 * 60 * 60 * 24));
}

function getWeek(d) {
    // Return first day of week
    d.setDate(d.getDate() - d.getDay());
    return Math.floor(getDate(d) / 7); 
}

function getDateFromWeekKey(k) {
    return getDateFromDateKey(k * 7 + 3);   // Week is based from 1970-1-4, which is first Sunday available
}

function getMonth(d) { 
    return d.getYear() * 12 + d.getMonth();
}

function getDateFromMonthKey(k) {
    return new Date(1900 + Math.floor(k / 12), k % 12, 1);
}

function getYear(d) {
    return d.getYear();
}

function getDateFromYearKey(k) {
    return new Date(k + 1900, 0, 1);
}

function getLocaleDateString(d) {
    return d.toLocaleDateString();
}

function getWeekLabel(d) {
    let label = "";

    d.setDate(d.getDate() - d.getDay());
    label += d.toLocaleDateString();

    // label += ' ~ ';

    // d.setDate(d.getDate() + 6);
    // label += d.toLocaleDateString();

    return label;
}

function getMonthLabel(d) {
    return d.toLocaleString("en", { month: "short", year: "numeric"});
}

function getYearLabel(d) {
    return d.toLocaleString("en", { year: "numeric"});
}

function getTotalDays(d, unit) {
    if (unit == 'week')
        return 7;
    if (unit == 'month')
        return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    if (unit == 'year') {
        let isLeapYear = function(d) {
            var year = d.getFullYear();
            if((year & 3) != 0) return false;
            return ((year % 100) != 0 || (year % 400) == 0);
        }
        return isLeapYear(d) ? 366 : 365;
    }
    return 1;
}

exports.getDateKey = function(data, params) {
    let getKey = getDate;

    // Update date
    switch (params.periode) {
        case 'week':
            getKey = getWeek;
            break;
        case 'month':
            getKey = getMonth;
            break;
        case 'year':
            getKey = getYear;
            break;
        default:
            break;
    }

    return getKey(data);
}

exports.getDateLabel = function(data, params) {
    let getLabel = getLocaleDateString;

    // Update date
    switch (params.periode) {
        case 'week':
            getLabel = getWeekLabel;
            break;
        case 'month':
            getLabel = getMonthLabel;
            break;
        case 'year':
            getLabel = getYearLabel;
            break;
        default:
            break;
    }

    return getLabel(data);
}

exports.getDateLabelFromKey = function(key, params) {
    switch (params.periode) {
        case 'week':
            return getWeekLabel(getDateFromWeekKey(key));
        case 'month':
            return getMonthLabel(getDateFromMonthKey(key));
        case 'year':
            return getYearLabel(getDateFromYearKey(key));
        default:
            return getLocaleDateString(getDateFromDateKey(key));
    }
}