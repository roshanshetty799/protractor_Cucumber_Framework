import {BasePage} from "./BasePage";
import {browser, by} from "protractor";

export class superCalculatorPage extends BasePage{

    async enterIntoFirstNumField(inputText){
        await this.enterIntoInputField('.input-small',inputText,0);

    }

    async enterIntoSecondNumField(inputText){
        await this.enterIntoInputField('.input-small',inputText,1);
    }

    async selectFromOperatorDropDown(operation){
        await this.selectItemFromDropdown('.form-inline',operation);
    }

    async clickGoButton(){
        await this.clickOnWebElem('#gobutton');
    }

    async getResultText(){
        return this.getWebElemText('h2');
    }
}