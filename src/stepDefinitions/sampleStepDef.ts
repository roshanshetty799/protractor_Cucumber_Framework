import {Then, When} from "cucumber";
import {CustomAssertion} from "../wrappers/CustomAssertion";
import {superCalculatorPage} from "../pageObjects/SuperCalculatorPage";
import {browser} from "protractor";
import {expect} from 'chai';


When('I am on Super Calculator page', async () => {
    await new CustomAssertion().verifyPageTitleEquals('Super Calculator');
});

When('I multiply {string} and {string}', async (firstNum,secondNum) => {
    await new superCalculatorPage().enterIntoFirstNumField(firstNum);
    await new superCalculatorPage().selectFromOperatorDropDown('MULTIPLICATION');
    await new superCalculatorPage().enterIntoSecondNumField(secondNum);
    await new superCalculatorPage().clickGoButton();

    // Adding a wait just for demonstration that it works
    await browser.sleep(2000);
});

Then('I should see {string} as result', async (totalNum) => {
    let actualResult = await new superCalculatorPage().getResultText();

    expect(actualResult,`Expected Super Calculator Page result to equal ${totalNum} 
    however found ${actualResult}`).to.equal(totalNum);
});