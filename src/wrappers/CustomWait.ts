/*
* Author      : Roshan S.
* Description : This class contains wrapper functions for frequently used Protractor 'wait' methods.
*
* */

import {browser, ElementFinder, ExpectedConditions} from "protractor";

let defaultWaitTimeout = 60000;

export class CustomWait {


    async untilPageTitleIs(title: string) {
        await browser.wait(await ExpectedConditions.titleIs(title), defaultWaitTimeout, `Form title should be equivalent to : ${title} however 
        found : ${await browser.getTitle()}`);
    }

    // Waits until the @element is visible on the DOM. Throws an error message if @defaultWaitTimeout is met.
    async untilElementIsVisible(element: ElementFinder, message?: string) {
        if (message) {
            await browser.wait(await ExpectedConditions.visibilityOf(element), defaultWaitTimeout, ` Error : ${message} \n Timed out waiting for element : ${element.locator()} `);
        } else {
            await browser.wait(await ExpectedConditions.visibilityOf(element), defaultWaitTimeout, ` Timed out waiting for element : ${element.locator()} `);
        }

    }

    async untilUrlContains(urlText){
        await browser.wait(await ExpectedConditions.urlContains(urlText),defaultWaitTimeout,`Expected url to contain the following: ${urlText}`);
    }




}