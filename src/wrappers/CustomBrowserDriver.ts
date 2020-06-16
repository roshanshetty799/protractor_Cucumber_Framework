/*
 Author      : Roshan S.
 Description : This class contains a wrapper for frequently used Protractor elements and browser objects.
               Best Practice is not to use them directly as this way we centralize our customized code into a single place.
 */


import {CustomWait} from "./CustomWait";
import {$, $$, browser, ElementFinder} from "protractor";

import {protractor} from "protractor/built/ptor";
import {e2eLogInfo} from "./CustomLogger";


export class CustomBrowserDriver {

    /* A wrapper around protractor '.click()' method. Waits for the element to be visible before performing the click.
    */
    async click(element: ElementFinder) {
        await new CustomWait().untilElementIsVisible(element);
        await element.click();

    }

    /* Closes the current window the driver is on when this function is called and switches to the only remaining window.
     * NOTE :  This function can only handle maximum two tabs.
     */
    async closeCurrentWindowAndSwitchToMain() {
        await browser.getAllWindowHandles().then(async (handles) => {
            if(handles.length === 2){
                await new CustomBrowserDriver().closeCurrentWindow();
            }
        });

       // await new customBrowserDriver().closeCurrentWindow();
        await new CustomBrowserDriver().switchToNewWindow(0);

    }


    /* A wrapper around protractor .sendKeys(). Waits for the @element to be visible before entering @text as string.
       Clears any text present in the input field before entering the text
    */
    async sendKeys(element, text: string) {

        await new CustomWait().untilElementIsVisible(element);
        await this.clearText(element);
        await element.sendKeys(text);
    }

    /* A wrapper around protractor .sendKeys() for dropdown element. Wait for the @element to be visible before entering @text as string.
    */
    async sendKeysToDropdown(element, text: string) {
        await new CustomWait().untilElementIsVisible(element);
        await element.sendKeys(text);
    }

    /*  Clears any text/string present in an input field.
    */
    async clearText(element: ElementFinder) {
        await browser.actions().mouseMove(element).perform();
        await element.sendKeys(protractor.Key.CONTROL, "a");
        await browser.sleep(400);
        await element.sendKeys(protractor.Key.DELETE);

    }

    /*  Selects specified @itemName from the dropdown field. If there are multiple dropdown fields on the page with the
     *  same className then pass @dropDownFieldIndex argument to select the relevant one.
     */
    async selectElementFromDropdown(className, itemName, dropDownFieldIndex?) {
        new CustomBrowserDriver().click($(`.${className}`));
        let dropDownList;
        if (dropDownFieldIndex) {
            dropDownList = await $$(`.${className}`).get(dropDownFieldIndex).$$(`select option`);
        } else {
            dropDownList = await $$(`.${className} select option`);
        }
        for (let i of dropDownList) {
            if ((await i.getAttribute('value')).includes(itemName)) {
                await new CustomBrowserDriver().click(i);
                break;
            }
        }


    }


    /* Sends 'Enter' Key press from the keyboard. If the @element param is provided then the
       @element is selected before hitting 'Enter.
    */

    async pressEnter(element?) {
        if (element) {
            await element.sendKeys(protractor.Key.ENTER);
            await e2eLogInfo(`Simulated Keyboard press: ENTER on element: ${element}`);
        } else {
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await e2eLogInfo('Simulated Keyboard press on the browser:  ENTER ');
        }
        await browser.sleep(500);
    }


    async sendKeyBoardShortCutEdit() {
        await browser.sleep(500);
        await browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.SHIFT, 'E'));
        await e2eLogInfo('Simulated Keyboard press on the browser:  CTRL+SHIFT+E ');
    }

    /* Returns the text contained in an input field. Use this for retrieving text from input field elements only.
    */
    async getElementInputText(element: ElementFinder) {
         await new CustomWait().untilElementIsVisible(element);
         return element.getAttribute('value');

    }

    /* Returns the text of an element. Use this for retrieving visible text of a web element (except input field).
    */
    async getElementText(element: ElementFinder) {
        await new CustomWait().untilElementIsVisible(element);
        return element.getText();

    }

    /* Switches to the browser window specified by index : @windowIndex
     */
    async switchToNewWindow(windowIndex) {
        await browser.getAllWindowHandles().then(async (handles) => {
            await browser.switchTo().window(handles[windowIndex]);
            await e2eLogInfo(`Navigated to URL : ${await browser.getCurrentUrl()} `);
        });
    }

    /* Closes current window
     */
    async closeCurrentWindow() {
        await browser.driver.close();
    }

    /*  Navigate to the specified page without reloading the browser. The page name is the value after '#' and before ':' on the url
     *  The function first looks up the current url and appends the pageName to the end of the URL
     */
    async setLocation(pageName) {
        await browser.sleep(1000);
        let currentUrlWithLoginToken = browser.getCurrentUrl().then((currentUrl) => (currentUrl.split('#', 1)).toString());
        await browser.sleep(1000);
        await browser.executeScript(((currentUrlWithLoginToken, pageName) => window.location.href = (`${currentUrlWithLoginToken}#${pageName}`)), currentUrlWithLoginToken, pageName);
        await e2eLogInfo(`Navigated to URL : ${await browser.getCurrentUrl()} `);
    }

}