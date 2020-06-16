import {Then, When} from "cucumber";
import {expect} from "chai";
import {getCurrentTwoDigitFormatDate, getCurrentTwoDigitFormatMonth} from "../utils/dateUtil";
import {CentrelinkSchedulePage} from "../pageObjects/CentrelinkSchedulePage";
import {deleteXlsxFile} from "../utils/excelUtil";



When('I click Request New Schedule', async () => {
    await new CentrelinkSchedulePage().clickRequestNewSchedule();
});

When('I export Centrelink Details to Excel', async () => {
    await new CentrelinkSchedulePage().exportCentrelinkScheduleToExcel();
});

Then('I verify the latest Centrelink Schedule appears within the list', async () => {
    let latestDownloadedScheduleDate = await new CentrelinkSchedulePage().getLatestCentrelinkScheduleDate();
    let currentDate =  `${getCurrentTwoDigitFormatDate()}/${getCurrentTwoDigitFormatMonth()}/${new Date().getFullYear()}`;
    await expect(latestDownloadedScheduleDate,`Expected latest Centrelink Schedule date to be : ${currentDate} however found
                                                  : ${currentDate}`).to.equal(currentDate);
    await deleteXlsxFile('CentrelinkSchedule');
});

