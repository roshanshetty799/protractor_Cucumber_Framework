import {BasePage} from "./BasePage";
import {browser} from "protractor";
import {e2eLogInfo} from "../wrappers/CustomLogger";


export class BeneficiariesPage extends BasePage {

    async getBeneficiaryFieldText(fieldClassName, beneficiaryIndex) {
        beneficiaryIndex--;
        return this.getWebElementTextByClassNameAndIndex(fieldClassName, beneficiaryIndex);
    }

    async clickCreate(){
        await this.clickOnWebElementByClassName('Create');
    }

    async clickAddBeneficiary(){
        await this.clickOnWebElementByClassName('AddBeneficiary');
    }

    async clickUpdate(){
        await this.clickOnWebElementByClassName('Update');
    }

    async clickBindingNominationForm(){
        await this.clickOnWebElementByClassName('Beneficiaries_bindingNominationButtonBar_header a');
    }

    async deleteBeneficiary(beneficiaryNumber){
        await new BeneficiariesPage().clickOnWebElementByClassName(`RemoveBeneficiary${beneficiaryNumber}`);
        await new BeneficiariesPage().clickOnWebElementByClassName('Next');
        await new BeneficiariesPage().clickOnWebElementByClassName('Submit');
        await browser.sleep(2000);
    }

    async enterIntoBeneficiaryFormField(beneficiaryNumber,beneficiaryDataTable){
        await e2eLogInfo(`--- Entering details in Beneficiary Form fields ---`);
        let beneficiaryElementindex = await beneficiaryNumber - 1;
        await new BeneficiariesPage().enterIntoFormFieldByClassNameAndIndex(beneficiaryElementindex, beneficiaryDataTable);
    }
}