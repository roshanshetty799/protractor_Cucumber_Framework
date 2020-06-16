import {BasePage} from "./BasePage";
import {browser} from "protractor";
import {e2eLogInfo} from "../wrappers/CustomLogger";


export class MoneyInPage extends BasePage {

    /* Returns the ineligibility message which is shown on the Employer and Personal Contribution page for a member over 75 years of age
     */
    async getWorkTestIneligibleMessage() {
        return this.getWebElementTextByClassName('MoneyIn_workTestIneligible_workTestIneligibleMessage');
    }

    /* Returns the ineligibility message which is shown on the Employer and Personal Contribution page for a member over between 65 - 74 years of age.
     * The message is shown when the member selects the radio option - I do not pass the 'work test'
     */
    async getDoNotPassTheWorkTestErrorMessage() {
        return this.getWebElementTextByClassName('MoneyIn_workTestEligibility_validationMessageBlock_over65FailValidationMessage');
    }

    /* Gets the Direct Debit header text on Employer and Personal Contribution page. This text can be used to verify that
     * the member was taken to the Direct Debit set up page post work-test check.
     */
    async getTopUpAccountPaymentOptionsText() {
        return this.getWebElementTextByClassName('MoneyIn_header');
    }

    /*
        Selects one of the two radio options presented on contribute page for a member between 65 - 74 years of age.
        Index 0 - I do pass the work test
        Index 1 - I do not pass the work test
     */
    async selectWorkTestEligibilityRadioOption(index) {
        await this.clickOnInputFieldByClassNameAndIndex('combinedWorkTestEligibilityAndExemptionOptions ',index);
    }

    async clickNewDirectDebit(){
        await this.clickOnWebElementByClassName('NewDirectDebit');
    }

    async clickUpdateDirectDebit(){
        await this.clickOnWebElementByClassName('UpdateDirectDebit');
    }

    async clickPrintEmployerContributionForm(){
        await this.clickOnWebElementByClassName('PrintEmployerContributionForm');
    }

    async clickPrintCheckForm(){
        await this.clickOnWebElementByClassName('PrintCheckForm');
    }

    async clickDirectDebitTermsAndConditionsForm (){
        await browser.sleep(2000);
        await this.clickOnInputFieldByClassNameAndIndex('directDebitTermsAndConditionsForm',1);
    }

    async enterIntoDirectDebitFormField(dataTable){
        await e2eLogInfo(`--- Entering details in Pension Form fields ---`);
        await this.enterIntoFormFieldByClassName(dataTable);
    }

    async getDirectDebitFieldText(className){
        return await this.getWebElementTextByClassName(className);
    }
}

