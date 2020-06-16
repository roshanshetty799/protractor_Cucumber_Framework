import {getSoapElementByWSDLAndOperation} from "../utils/soapUtil";
import {getCurrentDate} from "../utils/dateUtil";
import {browser} from "protractor";
import {getClientFund, getWebServiceURL} from "../env/environmentProps";

let clientName = browser.params.clientName;
let hostName = browser.params.hostName;



export default class SoapCall {
    /*
      Returns a list of member's investmentProfile by consuming the SOAP web service.
     */
    async getMemberInvestmentOptions(memberNumber : string) : Promise<string[]>{
        let soapBodyArguments = {
            endUser: 'TestAutomation',
            fundCode: `${await getClientFund(clientName, 'super')}`,
            memberNumber: `${memberNumber}`,
            effectiveDate: `${await getCurrentDate()}`
        };
        return await getSoapElementByWSDLAndOperation(`http://${await getWebServiceURL(clientName, hostName)}/Member?wsdl`,
            'getMemberInvestmentProfile00001', soapBodyArguments, 'investmentOption');
    }

    /*
        Returns a list of member's investmentProfile by consuming the SOAP web service.
        The returned SOAP response is further filtered by investmentManagerName
     */
    async getMemberInvProfileDetailsByInvManagerName(memberNumber, investmentManagerName) {
        let investmentOptions = await this.getMemberInvestmentOptions(memberNumber);
        return (investmentOptions.filter((inv)=> inv['investmentManagerName'] === investmentManagerName))[0];
    }


}

