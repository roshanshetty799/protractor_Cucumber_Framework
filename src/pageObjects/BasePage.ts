import {CustomBrowserDriver} from "../wrappers/CustomBrowserDriver";
import {$, $$, browser} from "protractor";
import {e2eLogInfo} from "../wrappers/CustomLogger";

let AOL_DropdownFieldClassName = ['benTitle', 'benGender', 'benRelationship', 'country', 'state',
    'state', 'paymentType', 'paymentFrequency', 'revTitle', 'revGender', 'revRelationship'];

export class BasePage {

    /* Locators
    */
    protected getWebElementByClassName(webElementClassName) {
        return $(`.${webElementClassName}`);
    }

    protected getWebElementByClassNameAndIndex(webElementClassName, webElementIndex) {
        return $$(`.${webElementClassName}`).get(webElementIndex);
    }

    protected getAllWebElementsByClassName(webElementClassName){
        return $$(`.${webElementClassName}`);
    }

    protected getInputFieldByIndex(fieldClassName, index) {
        return $$(`.${fieldClassName} input`).get(index);
    }

    protected getInputField(fieldClassName) {
        return $(`.${fieldClassName} input`);
    }

    protected getSaveAsPDFButton() {
        return $('div[class*="print"] a');
    }

    /*  Web Element Functions - These list of functions lets you interact with a Web Element.
     */

    protected async clickOnWebElementByClassName(webElementClassName) {
        await new CustomBrowserDriver().click(await this.getWebElementByClassName(webElementClassName));
        await e2eLogInfo(`Single click on a Web Element with Class Name : ${webElementClassName}`);
    }

    protected async clickOnWebElementByClassNameAndIndex(webElementClassName, webElementIndex) {
        await new CustomBrowserDriver().click(await this.getWebElementByClassNameAndIndex(webElementClassName, webElementIndex));
        await e2eLogInfo(`Single click on a Web Element with Class Name : ${webElementClassName} and Index : ${webElementIndex}`);
    }

    protected async clickOnInputFieldByClassNameAndIndex(inputFieldClassName, inputFieldIndex) {
        await new CustomBrowserDriver().click(await this.getInputFieldByIndex(inputFieldClassName, inputFieldIndex));
        await e2eLogInfo(`Single click on Input Field with Class Name : ${inputFieldClassName} and Index : ${inputFieldIndex}`);
    }

    protected async getWebElementTextByClassName(webElementClassName) {
        let webElementText = await new CustomBrowserDriver().getElementText(await this.getWebElementByClassName(webElementClassName));
        await e2eLogInfo(`Retrieved Text : ${webElementText} for Web Element with Class Name : ${webElementClassName}`);
        return webElementText;
    }

    protected async getInputFieldTextByClassName(webElementClassName) {
        let inputFieldText = await new CustomBrowserDriver().getElementText(await this.getInputField(webElementClassName));
        await e2eLogInfo(`Retrieved Text : ${inputFieldText} for Input Field with Class Name : ${webElementClassName}`);
        return inputFieldText;
    }

    protected async getWebElementTextByClassNameAndIndex(webElementClassName, webElementIndex) {
        let webElementText = await new CustomBrowserDriver().getElementText(await this.getWebElementByClassNameAndIndex(webElementClassName, webElementIndex));
        await e2eLogInfo(`Retrieved Text : ${webElementText} for Web Element with Class Name : ${webElementClassName} and Index : ${webElementIndex}`);
        return webElementText;
    }

    protected async getAllWebElementsText(elementLocator: string): Promise<string[]> {
        let elementsText: string[] = [];
        let webElementsList = await this.getAllWebElementsByClassName(elementLocator);
        await browser.sleep(1000);
        for (let i of webElementsList) {
            await elementsText.push(await new CustomBrowserDriver().getElementText(i));
        }
        return  elementsText;
    }

    protected async enterIntoInputFieldByClassNameAndIndex(inputFieldClassName, inputFieldIndex, inputText) {
        await new CustomBrowserDriver().sendKeys(await this.getInputFieldByIndex(inputFieldClassName, inputFieldIndex), inputText);
        await e2eLogInfo(`Entered Text : ${inputText} into Field with Class Name : ${inputFieldClassName} and Index : ${inputFieldIndex}`);
    }

    protected async enterIntoInputFieldByClassName(inputFieldClassName, inputText) {
        await new CustomBrowserDriver().sendKeys(await this.getInputField(inputFieldClassName), inputText);
        await e2eLogInfo(`Entered Text : ${inputText} into Field with Class Name : ${inputFieldClassName}`);
    }

    protected async selectItemFromDropdownByClassName(dropdownClassName, itemToSelect) {
        await new CustomBrowserDriver().selectElementFromDropdown(dropdownClassName, itemToSelect);
        await e2eLogInfo(`Selected Item : ${itemToSelect} from Dropdown Field by Class Name : ${dropdownClassName}`);
    }

    protected async selectItemFromDropdownByClassNameAndIndex(dropdownClassName, dropdownIndex, itemToSelect) {
        await new CustomBrowserDriver().selectElementFromDropdown(dropdownClassName, itemToSelect, dropdownIndex);
        await e2eLogInfo(`Selected Item : ${itemToSelect} from Dropdown Field by Class Name : ${dropdownClassName}`);
    }

    protected async enterIntoFormFieldByClassNameAndIndex(formInputFieldIndex, dataTable) {
        let dataTableHash = await dataTable.rowsHash();
        let dataTableRows = await dataTable.rows();

        for (let i of dataTableRows) {
            if (AOL_DropdownFieldClassName.includes(i[0])) {
                await this.selectItemFromDropdownByClassNameAndIndex(i[0], formInputFieldIndex, dataTableHash[i[0]]);
            } else {
                await this.enterIntoInputFieldByClassNameAndIndex(i[0], formInputFieldIndex, dataTableHash[i[0]]);
            }
        }
    }

    protected async enterIntoFormFieldByClassName(dataTable) {
        let dataTableHash = await dataTable.rowsHash();
        let dataTableRows = await dataTable.rows();

        for (let i of dataTableRows) {
            if (AOL_DropdownFieldClassName.includes(i[0])) {
                await this.selectItemFromDropdownByClassName(i[0], dataTableHash[i[0]]);
            } else {
                await this.enterIntoInputFieldByClassName(i[0], dataTableHash[i[0]]);
            }
        }
    }

    /*  Navigates to the passed page name. @pageName is the key with the corresponding value
    */

    async goToPage(pageName) {
        await new CustomBrowserDriver().click($('a[href="#' + pageName + '"]'));
        await e2eLogInfo(`Navigated to page : ${pageName}`);
    }


    async clickSaveAsPDFButton() {
        await new CustomBrowserDriver().click(await this.getSaveAsPDFButton());
        await e2eLogInfo(`Clicked Save As PDF Button`);
        await browser.sleep(5000);
    }

    async clickSubmit() {
        await this.clickOnWebElementByClassName('Submit');
    }

    async clickNext() {
        await this.clickOnWebElementByClassName('Next');
    }

    async clickDone() {
        await this.clickOnWebElementByClassName('Done');
    }

    async clickCancel() {
        await this.clickOnWebElementByClassName('cancel');
    }

    async clickDownload() {
        await this.clickOnWebElementByClassName('download');
        await browser.sleep(5000);
    }

    async clickEdit(){
        await this.clickOnWebElementByClassName('Edit');
    }
}