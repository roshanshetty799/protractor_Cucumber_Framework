import {browser} from "protractor";
import {CustomBrowserDriver} from "../wrappers/CustomBrowserDriver";
import {expect} from "chai";
import {CustomAssertion} from "../wrappers/CustomAssertion";
import {e2eLogInfo} from "../wrappers/CustomLogger";

import {BasePage} from "./BasePage";
import {getClientFund} from "../env/environmentProps";
import {CustomWait} from "../wrappers/CustomWait";

let clientName = browser.params.clientName;


export default class MembersPage extends BasePage {


    // Enters @searchText into the Search terms field of the Members page
    async enterIntoSearchTerms(searchText, fundType) {
        await this.clickOnWebElementByClassName('memberSearchFundFilter div button');
        await this.selectItemFromDropdownByClassName('memberSearchFundFilter div input', await getClientFund(clientName, fundType));
        await this.enterIntoInputFieldByClassName('memberSearchTerms', searchText);
        await this.selectFirstResultInSearchTerms();
    }


    async exportClientDetailsToExcel(){
        await this.selectItemFromDropdownByClassName('clientSearchExportBar','xlsx');
        await this.clickOnWebElementByClassName('right');
        await browser.sleep(5000);
    }

    async exportClientDetailsToPDF(){
        await this.selectItemFromDropdownByClassName('clientSearchExportBar','pdf');
        await this.clickOnWebElementByClassName('right');
        await browser.sleep(5000);
    }


    async enterIntoSearchTermsAndDoNotClickOnResult(searchText, fundType) {
        await this.clickOnWebElementByClassName('memberSearchFundFilter div button');
        await this.selectItemFromDropdownByClassName('memberSearchFundFilter div input', await getClientFund(clientName, fundType));
        await this.enterIntoInputFieldByClassName('memberSearchTerms', searchText);
        await new CustomWait().untilElementIsVisible(this.getWebElementByClassNameAndIndex('drillableListClickableRow',0));

    }

    /*
        Selects the first result from the table of results returned post search on Members page.
        After clicking on the first result, validates that the result opened in a new window.
     */
    private async selectFirstResultInSearchTerms() {

        await this.clickOnWebElementByClassNameAndIndex('drillableListClickableRow', 0);
        await e2eLogInfo(`Selected the first result post search from Search Terms on Members page`);

        await expect(await new CustomAssertion().verifyTotalWindowHandlesEquals(2, 20000), 'Failed to navigate to Member Dashboard page').to.be.equal(true);
        await e2eLogInfo(`Opened a new window on the browser`);

        await new CustomBrowserDriver().switchToNewWindow(1);


    }

}

