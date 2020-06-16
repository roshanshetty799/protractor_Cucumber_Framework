import {BasePage} from "./BasePage";
import {e2eLogInfo} from "../wrappers/CustomLogger";



export class PensionPage extends BasePage {


    async getPensionFieldText(fieldClassName) {
        let fieldText = await this.getWebElementTextByClassName(`${fieldClassName} div div`);
        return fieldText;
    }

    async enterIntoPensionFormField(dataTable){
        await e2eLogInfo(`--- Entering details in Pension Form fields ---`);
        await this.enterIntoFormFieldByClassName(dataTable);
    }

    async clickUpdatePensionPaymentDetails(){
        await this.clickOnWebElementByClassName('UpdatePensionPaymentDetails');
    }

    async clickUpdatePensionDetails(){
        await this.clickOnWebElementByClassName('UpdatePensionDetails');
    }

}


