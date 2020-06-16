/*
* Author     : Roshan S.
* Description: This file contains date utility functions which can be used across the framework
* */


/*Returns current date and time formatted as follows : DD.MM.YY  HH.MM.SS */
export const getformattedCurrentDateAndTime = () => {
    let time = new Date().toLocaleTimeString();
    let date = new Date().getDate() + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear();
    let formattedTime = time.replace(/:/gi, '.');

    return date + "  " + formattedTime;
}

// Returns the current Month in two digit format as follows : MM
export const getCurrentTwoDigitFormatMonth = () => {
    return (new Date().getMonth() < 10 ? '0' : '') + (new Date().getMonth() + 1);
}

// Returns the current date in two digit format as follows : DD
export const getCurrentTwoDigitFormatDate = () => {
    return (new Date().getDate() < 10 ? '0' : '') + new Date().getDate();
}

export const getCurrentDate = () => {
    return `${new Date().getFullYear()}-${getCurrentTwoDigitFormatMonth()}-${getCurrentTwoDigitFormatDate()}`;
}

/* Returns DOB for a person formatted as follows : YYYY.MM.DD. Requires @age of the person
 */
export const getDateOfBirthBasedOnAge = (age) => {
    let year, month, date;
    year = new Date().getFullYear() - age;
    date = new Date().getDate();
    if (date in [28, 30, 31] || (year % 4 === 0)) {
        date = 1;
        month = new Date().getMonth() + 2;
    } else {
        month = new Date().getMonth() + 1;
    }
    return (`${year}-${month}-${date}`);
}