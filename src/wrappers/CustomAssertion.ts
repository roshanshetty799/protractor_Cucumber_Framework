/*
 Author      : Roshan S.
 Description : This class contains custom assertion functions which are not not natively available under 'chai' assertion module
*/

import {expect} from 'chai';
import {browser} from "protractor";
import {CustomWait} from "./CustomWait";



export class CustomAssertion {

    private _softAssertMsgs : string = "";

    private get softAssertMsgs(): string {
        return this._softAssertMsgs;
    }

    private set softAssertMsgs(value: string) {
        this._softAssertMsgs = value;
    }

    /**
     * Performs a soft assertion.
     * On failure, instead of halting test execution, it stores all the error messages in
     * class property to be called upon towards the end of the test case by function - softAssertAll
     *
     *
     * @param expected - The data / value expected of the test case
     * @param actual   - The acutal value retrieved during execution
     * @param message  - Message to be displayed on failure
     */
     softAssertEqual(expected:string,actual:string,message:string):void{
        try {
             expect(expected,message).to.equal(actual);
        }catch (e) {
             this._softAssertMsgs = this.softAssertMsgs +  e.message + "\n";
        }
    }

    /**
     * Performs a soft assertion. Verifies @expected includes @actual
     * On failure, instead of halting test execution, it stores all the error messages in
     * class property to be called upon towards the end of the test case by function - softAssertAll
     *
     *
     * @param expected - The data / value expected of the test case
     * @param actual   - The acutal value retrieved during execution
     * @param message  - Message to be displayed on failure
     */
    softAssertIncludes(expected:string,actual:string,message:string):void{
        try {
            expect(expected,message).includes(actual);
        }catch (e) {
            this._softAssertMsgs = this.softAssertMsgs +  e.message + "\n";
        }
    }

    /**
     * Call this at the end of the test case after all the softAssert fuctions have been called.
     * The failures encountered during soft assertions would only be logged if this function is called.
     *
     * @param errorTitle - A short summary of the error messages for logging / reporting purposes
     */
     sofAssertAll(errorTitle:string):void{
         if ( this.softAssertMsgs.length > 0){
             throw new Error(`${errorTitle} \n ${this.softAssertMsgs}`);
         }
    }

    async verifyPageTitleEquals(title: string) {
        await new CustomWait().untilPageTitleIs(title);
        await expect(await browser.getTitle()).to.equal(title);
    }

    /**
     *  Returns true if the current total of windows in the browser equals the expected value.
     *  Returns false if the the current total of windows in the browser does not equal the expected value after a timeout.
     */
    async verifyTotalWindowHandlesEquals(expectedWindowHandles, timeOut) {
        let flag = false;

        for (let i = 0; i < timeOut; i++) {
            let totalWindowHandles = await browser.getAllWindowHandles();
            if (totalWindowHandles.length === expectedWindowHandles) {
                flag = true;
                return flag;
            }
            i += 1000;
            await browser.sleep(1000);
        }
        return flag;
    }

    /**
     *  This function can be used compare the expected value in a dataTable form a .feature file vs the actual value contained in the DB column
     *  It performs a soft assertion so that the test case does not stop execution when the first error is detected. Instead, it goes through
     *  all the assertions and lists all the errors post execution.
     *
     *  Needs two arguments : @dataBaseDataTable & @dataFromDataBase
     *
     * @dataBaseDataTable - Only a datatable with two columns would work. The first column would be the DB column and the second it's expected value.
     *  @dataFromDatabase - This is an array of queryResult returned from the database. Only the first row of the query result is relevant and is considered for comparison.
     */
    async verifyValueFromDataTableAgainstDatabase(dataTable, dataFromDataBase) {
        for (let row of await dataTable.rows()) {
            // Value retrieved by passing the DB Column name. This is passed from the First column of the datTable
            let actualValue = await dataFromDataBase[row[0]];

            // The Second column consisting of expected value in the DB column
            let expectedValue = await row[1];

            await this.softAssertEqual((await expectedValue.toString()).trim(),(await actualValue.toString()).trim(),
                `Expected DB Column : ${row[0]} to contain value : ${(await expectedValue.toString()).trim()}
             however found ${await actualValue.toString()}`);
        }
        await this.sofAssertAll(`Multiple Assertion Failures. Expected value(s) not found in Database Table(s)`);
    }
}