/*
* Author     : Roshan S.
* Description: This file contains date utility functions which can be used across the framework
* */
import moment from "moment";



/*Returns current date and time formatted as follows : DD.MM.YY  HH.MM.SS */
export const getformattedCurrentDateAndTime = ()=> moment().format('DD.MM.YYYY h.mm.ss a');

export const getCurrentDate = (format = "YYYY-MM-DD" )=> moment().format(format);

export const subtractYearsFromCurrentDate = (years) => moment(new Date(moment().subtract(years, 'years').calendar())).format("YYYY-MM-DD");

