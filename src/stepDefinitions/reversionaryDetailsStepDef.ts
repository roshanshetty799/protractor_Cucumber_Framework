import {Then, When} from "cucumber";
import {browser} from "protractor";
import DataBasePage from "../databaseHelpers/DataBasePage";
import {memberNumber} from "./dataBaseQueryStepDef";
import {CustomAssertion} from "../wrappers/CustomAssertion";
import {ReversionaryPage} from "../pageObjects/ReversionaryPage";
import {expect} from "chai";

let descriptionByCode = require('../databaseHelpers/descriptionCodeInformation');

When('I enter the following Reversionary details', async (reversionaryDataTable) => {
    await new ReversionaryPage().enterIntoReversionaryFormField(reversionaryDataTable);
});

Then('I verify Reversionary details are updated correctly in the database', async (revDataTable) => {
    await browser.sleep(3000);
    let revDetails = await new DataBasePage().getReversionaryDetailsFromMemberNumber(memberNumber);
    await new CustomAssertion().verifyValueFromDataTableAgainstDatabase(revDataTable, revDetails);

});

Then('I verify that the Member Reversionary details on the AOL page are correct', async (dataTable) => {
    let dataTableRows = await dataTable.rows();
    let dataTableHash = await dataTable.rowsHash();

    let revDetailsFromDB = await new DataBasePage().getReversionaryDetailsFromMemberNumber(memberNumber);

    for (let i of dataTableRows) {

        let AOL_Field_Text = await new ReversionaryPage().getReversionaryFieldText(i[0]);
        let DB_Column = dataTableHash[i[0]];
        let DB_Column_Data = await revDetailsFromDB[0][DB_Column];

        if (i[0] === 'revGender') {
            let gender = await descriptionByCode.gender[DB_Column_Data];
            await expect(AOL_Field_Text,`Expected DB Column : ${DB_Column} to contain code for Description : ${AOL_Field_Text}
                  however found code for Description : ${gender}`).to.equal(gender);
        } else if (i[0] === 'revRelationship') {
            let relationship = await descriptionByCode.relationship[DB_Column_Data];
            await expect(AOL_Field_Text,`Expected DB Column : ${DB_Column} to contain code for Description : ${AOL_Field_Text}
                  however found code for Description : ${relationship}`).to.equal(relationship);
        } else {
            await expect(AOL_Field_Text,`Expected DB Column : ${DB_Column} to contain value : ${AOL_Field_Text} however found : ${await DB_Column_Data.trim()}`).to.equal(await DB_Column_Data.trim());
        }


    }
});
