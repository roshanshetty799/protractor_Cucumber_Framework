import {When} from "cucumber";
import DataBasePage from "../databaseHelpers/DataBasePage";
import AdminMemberSearchPage from "../pageObjects/AdminMemberSearchPage";


export let memberNumber,fundType,categoryType;

/*
  Step defs to retrieve the relevant member for the test case.
 */

When('I look up for a member over {string} years of age in super fund', async (age) => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberOverAge(age, fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look up for a member under {string} years of age in super fund', async (age) => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberUnderAge(age, fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look up for a member between {string} and {string} years of age with work-test pending in super fund', async (minimumAge, maximumAge) => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberBetweenAge_WithPendingWorkTest(minimumAge, maximumAge, fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for a member under {string} with no existing direct debit in super fund', async (age) => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberUnderAge_WithoutAnExistingDirectDebit(age, fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for a member with existing direct debit in super fund', async () => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberWithExistingDirectDebit(fundType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for a member with no share trading account in super fund', async () => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberWithoutAnExistingShareTradingAccount('super', 'super');
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, 'super');
});

When('I look for a member with share trading account in super fund', async () => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberWithExistingShareTradingAccount();
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for a member under {string} with no active beneficiary in super fund', async (age) => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberUnderAge_WithoutAnExistingBeneficiary(age, fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for a member under {string} with an active beneficiary in super fund', async (age) => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberUnderAge_WithExistingBeneficiary(age, fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for member with an active pension account', async () => {
    fundType = 'pension',categoryType = 'pension';
    memberNumber = await new DataBasePage().getMemberWithAnActivePensionAccount();
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for member with an active pension account and no reversionary', async () => {
    fundType = 'pension',categoryType = 'pension';
    memberNumber = await new DataBasePage().getMemberWithAnActivePensionAccountAndNoReversionary();
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I look for member with an active pension account and an existing reversionary', async () => {
    fundType = 'pension',categoryType = 'pension';
    memberNumber = await new DataBasePage().getMemberWithAnActivePensionAccountAndAnExistingReversionary();
    await new AdminMemberSearchPage().enterIntoSearchTerms(memberNumber, fundType);
});

When('I enter an active member number in the Admin Member Search Page', async () => {
    fundType = 'super',categoryType = 'super';
    memberNumber = await new DataBasePage().getMemberUnderAge('65', fundType, categoryType);
    await new AdminMemberSearchPage().enterIntoSearchTermsAndDoNotClickOnResult(memberNumber, fundType);
});








