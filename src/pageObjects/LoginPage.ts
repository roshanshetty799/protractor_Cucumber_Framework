import {browser} from "protractor";
import {e2eLogInfo} from "../wrappers/CustomLogger";
import {getBaseURL, getClientPassword, getClientUsername} from "../env/environmentProps";
import {BasePage} from "./BasePage";


let clientName = browser.params.clientName;
let hostName = browser.params.hostName;


export class LoginPage extends BasePage {

    /* Performs a login to AOL. Reads the username and password from environmentProps.json file located under ./src/env/
     */
    async loginToAOL() {
        await browser.navigate().to(`https://${hostName}.${getBaseURL()}/${clientName}/index.html#Login`);
        await e2eLogInfo(`Navigated to URL : ${await browser.getCurrentUrl()}`);

        await this.enterIntoInputFieldByClassName('username', getClientUsername(clientName));
        await this.enterIntoInputFieldByClassName('password', getClientPassword(clientName));
        await this.clickOnWebElementByClassName('Submit');
    }
}

