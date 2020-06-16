import {e2eLogError, e2eLogInfo} from "../wrappers/CustomLogger";


const downloadsFolder = require('downloads-folder');
const exceljs = require('exceljs');
const fs = require('fs-extra');

/* Retrieve cell value from an excel file.
*/
export const getValueFromExcelCell = async (fileName, sheetNameOrIndex, cellAddress) => {
    let workbook = await new exceljs.Workbook().xlsx.readFile(`${downloadsFolder()}/${fileName}.xlsx`);
    let worksheet = await workbook.getWorksheet(sheetNameOrIndex);
    return await worksheet.getCell(cellAddress).value;
}


/* Delete's the specified xlsx file in the system 'Downloads' folder
*/
export const deleteXlsxFile = (fileName) => {
    fs.remove(`${downloadsFolder()}/${fileName}.xlsx`, err => {
        if (err) return e2eLogError(`Unable to delete excel file ${fileName}. ERROR : ${err}`);
        e2eLogInfo(`Deleted excel file ${fileName}`);
    });
}

