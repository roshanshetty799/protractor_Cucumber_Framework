import {BasePage} from "./BasePage";
import {browser} from "protractor";

export class CentrelinkSchedulePage extends BasePage{



    async exportCentrelinkScheduleToExcel(){
        await browser.sleep(3000);
        await this.selectItemFromDropdownByClassName('centrelinkExportBar','xlsx');
        await this.clickOnWebElementByClassName('right');
        await browser.sleep(5000);
    }

    async clickRequestNewSchedule(){
        await this.clickOnWebElementByClassName('RequestNewSchedule');
    }

    async getLatestCentrelinkScheduleDate(){
        await browser.sleep(2000);
       return await this.getWebElementTextByClassNameAndIndex('correspondenceDate',0);
    }

}