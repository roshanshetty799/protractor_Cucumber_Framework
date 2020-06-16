import {Then, When} from "cucumber";
import {ProfilePage} from "../pageObjects/ProfilePage";
import SoapCall from "../soapHelpers/SoapCall";
import {memberNumber} from "./dataBaseQueryStepDef";
import {e2eLogInfo} from "../wrappers/CustomLogger";
import {expect} from "chai";

Then('I validate that the Investment Profile is listed correctly on AOL', async () => {
    let investmentListWithPercentageFromAOL = await new ProfilePage().getAllInvestmentsWithNameAndPercentage();
      for(let investmentManagerName of await Object.keys(investmentListWithPercentageFromAOL)){
        let investmentPercentageFromAOL = investmentListWithPercentageFromAOL[investmentManagerName];
        if(investmentPercentageFromAOL !== '0.00%' && investmentPercentageFromAOL !== '100.00%'){
            await e2eLogInfo(`Found Allocation Percentage : ${investmentPercentageFromAOL} for Investment Manager : ${investmentManagerName} on AOL`);
            let investmentProfileFromWebService = await new SoapCall().getMemberInvProfileDetailsByInvManagerName(memberNumber,investmentManagerName);
            await e2eLogInfo(`Found Allocation Percentage : ${investmentProfileFromWebService['investmentPercentage']} for Investment Manager : ${investmentManagerName} from web service`)

            await expect(investmentPercentageFromAOL,`Found Allocation Percentage to be : ${investmentPercentageFromAOL} for investmentManager : ${investmentManagerName} 
            on AOL however found the percentage : ${investmentProfileFromWebService['investmentPercentage']} from Web Service
            `).includes(investmentProfileFromWebService['investmentPercentage']);

        }


    }

});