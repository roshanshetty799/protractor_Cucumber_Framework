import {BasePage} from "../pageObjects/BasePage";
import {Given, Then, When} from "cucumber";
import {CustomBrowserDriver} from "../wrappers/CustomBrowserDriver";
import {deletePdf, getTextFrompdf} from "../utils/pdfUtil";
import DataBasePage from "../databaseHelpers/DataBasePage";
import {expect} from "chai";
import {categoryType, fundType, memberNumber} from "./dataBaseQueryStepDef";
import {deleteXlsxFile, getValueFromExcelCell} from "../utils/excelUtil";
import {$, $$, ElementFinder} from "protractor";
import {stringify} from "querystring";


Given('I am on {string} page', async (pageName) => {
    await new BasePage().goToPage(pageName);
});

When('I navigate to {string}', async (pageName) => {
    await new CustomBrowserDriver().setLocation(pageName);
});

When('I click Submit', async () => {
    await new BasePage().clickSubmit();
});

When('I click Next', async () => {
    await new BasePage().clickNext();
});

When('I click Done', async () => {
    await new BasePage().clickDone();
});

When('I click Cancel', async () => {
    await new BasePage().clickCancel();
});

When('I click Download', async () => {
    await new BasePage().clickDownload();
});

When('I save as PDF', async () => {
    await new BasePage().clickSaveAsPDFButton();
});







Then('I verify {string} PDF is saved and contains below listed DB column values', async (pdfName, dbColumns) => {
    let pdfText = await getTextFrompdf(pdfName);
    await deletePdf(pdfName);
    let memberDetails = await new DataBasePage().getMemberDetailsFromMemberNumber(memberNumber, fundType, categoryType);
    let dbColumnsRow = await dbColumns.rows();
    for (let i of dbColumnsRow) {
        await expect(pdfText, `Did not find ${memberDetails[0][i[0]]} within ${pdfName}.pdf `).includes(await (memberDetails[0][i[0]]).trim());
    }
});

Then('I verify {string} pdf is saved and contains the below statement', async (pdfName, expectedMessage) => {
    let pdfText = await getTextFrompdf(pdfName);
    await deletePdf(pdfName);
    expect(pdfText, `Expected ${pdfName}.pdf to include ${expectedMessage}`).includes(expectedMessage);
});

Then('I verify {string} PDF is saved and contains the below listed text', async (pdfName, stringList) => {
    let pdfText = await getTextFrompdf(pdfName);
    await deletePdf(pdfName);
    let stringListRows = await stringList.rows();
    for (let i of stringListRows) {
        await expect(pdfText,`Did not find string : ${i[0]} in ${pdfName}.pdf`).includes(i[0]);
    }
});

Then('I verify {string} xlsx file is saved and contains below listed DB column values', async (xlsxFileName, dataTable) => {
    let memberDetails = await new DataBasePage().getMemberDetailsFromMemberNumber(memberNumber, fundType, categoryType);

    let dataTableHash = await dataTable.rowsHash();
    let dataTableRows = await dataTable.rows();

    for (let i of dataTableRows) {
        let cellValue = await getValueFromExcelCell(xlsxFileName, 1, i[0]);
        let DbColumnValue = await (memberDetails[0][dataTableHash[i[0]]]).trim();
        await expect(cellValue,`Expected cell : ${i[0]} to contain value : ${DbColumnValue} however found : ${cellValue}`).to.equal(DbColumnValue);
    }
    await deleteXlsxFile(xlsxFileName);
});


