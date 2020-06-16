import {BasePage} from "./BasePage";
import {$, $$, browser} from "protractor";
import {e2eLogInfo} from "../wrappers/CustomLogger";

export class ProfilePage extends BasePage {

    /*
        Reads the whole investment table on the Profile page and returns the Investment Name and it's Allocation Percentage as a Key : Value Pair
        Example :  {'Cash Hub' : '10.20%'}
     */
    async getAllInvestmentsWithNameAndPercentage() : Promise<object> {

        let investmentList : string[] = await this.getAllWebElementsText(`investmentProfileDetailsList td`);
        await browser.sleep(1000);
        let investmentListAsObject = {};
        await investmentList.forEach((item,index)=>{
            if(index % 2 === 0) {
                investmentListAsObject[item] = investmentList[index + 1];
            }
        })
        return investmentListAsObject;

    }

}


