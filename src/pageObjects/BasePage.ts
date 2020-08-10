import {CustomBrowserDriver} from "../wrappers/CustomBrowserDriver";
import {$, $$, ElementArrayFinder, ElementFinder} from "protractor";


export class BasePage {

    driver: CustomBrowserDriver;


    constructor() {
        this.driver = new CustomBrowserDriver();
    }



    /* Locators
    */

    protected getWebElem(cssSelector:string,index?:number): ElementFinder{
        return index ? $$(cssSelector).get(index) : $(cssSelector);
    }

    protected getAllWebElem(cssSelector:string): ElementArrayFinder{
        return $$(cssSelector);
    }

    protected getInputField(cssSelector:string,index?:number): ElementFinder{
        return index ? $$(cssSelector).get(index) : $(`${cssSelector}`);
    }

    protected getAllDropDownElem(cssSelector:string,index?:number): ElementArrayFinder{
        return index ? $$(cssSelector).get(index).$$(`select option`) : $$(cssSelector).$$(`select option`);
    }



    /*  Web Element Functions - These list of functions lets you interact with a Web Element.
     */


    protected async clickOnWebElem(cssSelector: string, index?: number): Promise<void> {
        return this.driver.click(index ?  this.getWebElem(cssSelector, index) : this.getWebElem(cssSelector));
    }

    protected async clickOnInputField(cssSelector: string, index?: number): Promise<void> {
        return this.driver.click(index ? this.getInputField(cssSelector,index) : this.getInputField(cssSelector));
    }

    protected async getWebElemText(cssSelector: string, index?: number): Promise<string> {
        return this.driver.getElementText(index ? this.getWebElem(cssSelector, index) : this.getWebElem(cssSelector));
    }

    protected async getAllWebElementsText(cssSelector: string): Promise<string[]> {
        // @ts-ignore
        return (this.getAllWebElem(cssSelector)).getText();
    }

    protected async enterIntoInputField (cssSelector: string, inputText: string, index?: number): Promise<void> {
        return this.driver.sendKeys(index ? this.getInputField(cssSelector,index) : this.getInputField(cssSelector),
            inputText);
    }

    protected async selectItemFromDropdown(cssSelector:string, item:string, index?:number):Promise<void> {
        await this.driver.selectElementFromDropdown(index ? this.getAllDropDownElem(cssSelector,index) : this.getAllDropDownElem(cssSelector)
            ,item);
    }

}