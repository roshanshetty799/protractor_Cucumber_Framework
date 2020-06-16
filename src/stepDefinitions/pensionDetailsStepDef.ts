import {Then, When} from "cucumber";
import {PensionPage} from "../pageObjects/PensionPage";
import DataBasePage from "../databaseHelpers/DataBasePage";
import {memberNumber} from "./dataBaseQueryStepDef";
import {expect} from "chai";

let descriptionByCode = require('../databaseHelpers/descriptionCodeInformation');

Then('I verify Member pension details on the AOL page are correct', async (dataTable) => {
    let dataTableRows = await dataTable.rows();
    let dataTableHash = await dataTable.rowsHash();

    let pensionDetailsFromDB = await new DataBasePage().getPensionDetailsByMemberNumber(memberNumber);

    for (let i of dataTableRows) {
        let AOL_Field_Text = await new PensionPage().getPensionFieldText(i[0]);
        let DB_Column = dataTableHash[i[0]];
        let DB_Column_Data = await pensionDetailsFromDB[0][DB_Column];

        if (i[0] === "paymentType") {
            let paymentDescription = await descriptionByCode.paymentType[DB_Column_Data];
            await expect(AOL_Field_Text, `Expected DB Column : ${DB_Column} to contain code for Description : ${AOL_Field_Text} 
            however found code for Description : ${paymentDescription} `).to.equal(paymentDescription);

        } else if (i[0] === "paymentFrequency") {
            let paymentFrequency = await descriptionByCode.paymentFrequency[DB_Column_Data];
            await expect(AOL_Field_Text, `Expected DB Column : ${DB_Column} to contain code for Description : ${AOL_Field_Text} 
            however found code for Description : ${paymentFrequency} `).to.equal(paymentFrequency);
        } else {
            await expect(AOL_Field_Text, `Expected DB Column : ${DB_Column} to contain value : ${AOL_Field_Text} 
            however found : ${DB_Column_Data} `).to.equal(DB_Column_Data.trim());
        }
    }
});

When('I click Update Pension Details', async () => {
    await new PensionPage().clickUpdatePensionDetails();
});

When('I click Update Pension Payment Details', async () => {
    await new PensionPage().clickUpdatePensionPaymentDetails();
});

When('I update Pension Details as follows', async (dataTable) => {
    await new PensionPage().enterIntoPensionFormField(dataTable);
});

