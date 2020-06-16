import {runSqlQueryAndReturnResult, runUpdateSqlQuery} from "../wrappers/CustomSqlDriver";
import {e2eLogInfo} from "../wrappers/CustomLogger";
import {browser} from "protractor";

import {
    getCurrentDate,
    getDateOfBirthBasedOnAge
} from "../utils/dateUtil";
import {getClientCategory, getClientFund} from "../env/environmentProps";


let query, errorMessage, queryResult;
let clientName = browser.params.clientName;


export default class DataBasePage {

    async getMemberOverAge(age, fundType, categoryType) {

        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE C.D2d_Birth < '${await getDateOfBirthBasedOnAge(age)}' 
                 AND M.MDz_Category = '${await getClientCategory(clientName, categoryType)}' AND 
                 M.MDz_Fund = '${await getClientFund(clientName, fundType)}' AND M.MDz_Status = 'C' AND C.D2z_Status = 'C'`;

        errorMessage = `Could not find a client over - ${age} years of age`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved Client over ${age} years of age From Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult[0]['MDz_Member'];
    }

    private async getMemberDetailsUnderAge(age, fundType, categoryType) {
        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE C.D2d_Birth > '${await getDateOfBirthBasedOnAge(age)}' AND M.MDz_Category = '${await getClientCategory(clientName, categoryType)}' 
                 AND MDz_Fund = '${await getClientFund(clientName, fundType)}' AND M.MDz_Status = 'C' AND C.D2z_Status = 'C'`;

        errorMessage = `Could not find a client under - ${age} years of age`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved Client under ${age} years of age From Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult;
    }


    async getMemberUnderAge(age, fundType, categoryType) {
        let queryResult = await this.getMemberDetailsUnderAge(age, fundType, categoryType);
        return queryResult[0]['MDz_Member'];
    }

    async getMemberWithoutAnExistingShareTradingAccount(fundType, categoryType) {
        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 INNER JOIN Mbr_Supplementry_Hst AS SB
                 ON M.MDz_Member = SBz_Member
                 WHERE M.MDz_Category = '${await getClientCategory(clientName, categoryType)}' AND MDz_Fund = '${await getClientFund(clientName, fundType)}'
                 AND M.MDz_Status = 'C' AND C.D2z_Status = 'C' AND SB.SBc_UserDefndFlags01 = ''`

        errorMessage = `Could not find a client without an existing share trading account`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved Client without an existing share trading account From Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult[0]['MDz_Member'];
    }

    async getMemberWithExistingShareTradingAccount() {
        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE C.D2z_Client = (SELECT TOP 1 SBz_Client FROM Mbr_Supplementry_Hst WHERE SBc_UserDefndFlags01 = 'A')`;

        errorMessage = `Could not find a client with existing share trading account`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved Client with an existing share trading account From Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult[0]['MDz_Member'];
    }


    async getMemberBetweenAge_WithPendingWorkTest(minAge, maxAge, fundType, categoryType) {

        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE  M.MDz_Category = '${await getClientCategory(clientName, categoryType)}' AND MDz_Fund = '${await getClientFund(clientName, fundType)}'
                 AND M.MDz_Status = 'C' AND C.D2z_Status = 'C' AND C.D2d_Last_Worked < '01/01/${new Date().getFullYear() - 1}'
                 AND C.D2d_Birth BETWEEN '${await getDateOfBirthBasedOnAge(maxAge)}' AND '${await getDateOfBirthBasedOnAge(minAge)}'`;

        errorMessage = `Could not find a client between - ${minAge} and ${maxAge} years of age`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved Client over between - ${minAge} and ${maxAge} years of age And Work-test pending From Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult[0]['MDz_Member'];
    }


    async getMember_D2d_Last_Worked(memberNumber, fundType, categoryType) {

        query = `SELECT TOP 1 * FROM Client AS C 
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE M.MDz_Member = '${memberNumber}' AND M.MDz_Category = '${await getClientCategory(clientName, categoryType)}' AND MDz_Fund = '${await getClientFund(clientName, fundType)}' 
                 AND M.MDz_Status = 'C' AND C.D2z_Status = 'C'`;

        errorMessage = `Error retrieving D2d_Last_Worked for ${memberNumber}`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved D2d_Last_Worked Date for member ${memberNumber} From Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult[0]['D2d_Last_Worked'];
    }

    // Returns a member with an active super account and no direct debit details on record
    async getMemberUnderAge_WithoutAnExistingDirectDebit(age, fundType, categoryType) {
        let memberNumber = await this.getMemberUnderAge(age, fundType, categoryType);

        query = `DELETE FROM Mbr_Supplementry_Hst WHERE SBz_Member = '${memberNumber}' AND SBz_Fund = '${await getClientFund(clientName, fundType)}'`;

        errorMessage = `Unable to Delete existing Direct Debit details for member : ${memberNumber}`;
        await runUpdateSqlQuery(query, errorMessage);

        return memberNumber;


    }

    async getMemberWithExistingDirectDebit(fundType) {

        query = `SELECT TOP 1 * FROM Mbr_Supplementry_Hst 
                 WHERE SBc_UserDefndFlags02 = 'Y' AND SBz_Fund = '${await getClientFund(clientName, fundType)}' AND SBd_Effective = '${await getCurrentDate()}' 
                 ORDER BY SBd_Effective DESC`;

        errorMessage = `Unable to find a member with existing Direct Debit on file`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        return queryResult[0]['SBz_Member'];

    }

    async getMemberDirectDebitDetails(memberNumber, fundType) {
        query = `SELECT TOP 1 FORMAT(SBd_Anniversary,'dd/MM/yyyy') AS Formatted_SBd_Anniversary,
                 FORMAT(SBd_Effective,'yyyy-MM-dd') AS Formatted_SBd_Effective,
                 FORMAT(SBf_User_Def_Amt_1,'C')AS Formatted_SBf_User_Def_Amt_1,
                 FORMAT(SBf_User_Def_Amt_2,'C')AS Formatted_SBf_User_Def_Amt_2,
                 * FROM Mbr_Supplementry_Hst 
                 WHERE SBz_Member = '${memberNumber}'AND SBc_UserDefndFlags02 = 'Y' AND SBz_Fund = '${await getClientFund(clientName, fundType)}' 
                 ORDER BY SBd_Effective DESC`;

        errorMessage = `Could not find Direct Debit details for member : ${memberNumber}`

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);
        await e2eLogInfo(`Fetched Direct Debit details for member : ${memberNumber}`);
        return queryResult;
    }

    async getMemberDetailsFromMemberNumber(memberNumber, fundType, categoryType) {
        query = `Select TOP 1 *,FORMAT(D2d_Birth,'dd/MM/yyyy') AS Formatted_D2d_Birth,
                 CONCAT(RTRIM(D2z_Given_Names), ' ',D2z_Surname) As Full_Name,
                 FORMAT(GETDATE(),'dd/MM/yyyy') AS CurrentDate
                 FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE M.MDz_Category = '${await getClientCategory(clientName, categoryType)}' AND M.MDz_Fund = '${await getClientFund(clientName, fundType)}' AND M.MDz_Member = '${memberNumber}'`;

        errorMessage = `Could not find details for member : ${memberNumber}`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Fetched details for member : ${memberNumber}`);
        return queryResult;
    }

    async getShareTradingApplicationStatus(memberNumber, fundType) {
        query = `SELECT TOP 1 * FROM Mbr_Supplementry_Hst AS SB
                 INNER JOIN Client as C
                 ON C.D2z_Client = SB.SBz_Client
                 WHERE SB.SBd_Effective = '${await getCurrentDate()}' AND 
                 C.D2z_Client = (SELECT MDz_Acct_No from Member WHERE MDz_Fund = '${await getClientFund(clientName, fundType)}' AND MDz_Member = '${memberNumber}')`;

        errorMessage = `Could not find Share Trading application status details for member : ${memberNumber}`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);
        await e2eLogInfo(`Fetched Share Trading Application status for member : ${memberNumber}`);
        return queryResult[0]['SBc_UserDefndFlags01'];
    }

    async getMemberUnderAge_WithoutAnExistingBeneficiary(age, fundType, categoryType) {
        let queryResult = await this.getMemberDetailsUnderAge(age, fundType, categoryType);

        query = `DELETE FROM Mbr_Dependants WHERE DXz_Client like '%${queryResult[0]['D2z_Client']}%'`;

        errorMessage = `Unable to delete beneficiary details for member ${queryResult[0]['MDz_Member']}`;
        await runUpdateSqlQuery(query, errorMessage);

        return queryResult[0]['MDz_Member'];
    }

    async getMemberUnderAge_WithExistingBeneficiary(age, fundType, categoryType) {

        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 INNER JOIN Mbr_Dependants AS MB
                 ON C.D2z_Client = MB.DXz_Client
                 WHERE C.D2d_Birth > '${await getDateOfBirthBasedOnAge(age)}' AND M.MDz_Category = '${await getClientCategory(clientName, categoryType)}'
                 AND MDz_Fund = '${await getClientFund(clientName, fundType)}' AND M.MDz_Status = 'C' AND C.D2z_Status = 'C' 
                 AND MB.DXf_Dependant_Pcnt = '100' AND MB.DXz_Deleted = '' AND MB.DXc_Bind_Nomination != 'L'`;

        errorMessage = `Unable to find a member with existing beneficiary`;
        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved member with existing beneficiary from Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);
        return queryResult[0]['MDz_Member'];
    }


    async getMemberBeneficiaryDetails(memberNumber, DXz_Dependant_No, fundType) {
        query = `SELECT *,FORMAT(DXd_Date_Of_Birth,'dd/MM/yyyy') as Formatted_DXd_Date_Of_Birth FROM Mbr_Dependants
                 INNER JOIN Member
                 ON Member.MDz_Acct_No = Mbr_Dependants.DXz_Client
                 WHERE Member.MDz_Member = '${memberNumber}' AND Member.MDz_Fund = '${await getClientFund(clientName, fundType)}' AND Mbr_Dependants.DXz_Dependant_No = '0${DXz_Dependant_No}'`;

        errorMessage = `Unable to find beneficiary details for member ${memberNumber}`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        return queryResult;
    }

    async getMemberWithAnActivePensionAccount() {
        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE M.MDz_Category = '${getClientCategory(clientName, 'pension')}' AND M.MDz_Status = 'A'`;

        errorMessage = `Unable to find a member with an active pension account`;
        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved member with an active Pension Account from Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);

        return queryResult[0]['MDz_Member'];
    }

    async getMemberWithAnActivePensionAccountAndNoReversionary() {
        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE M.MDz_Category = '${getClientCategory(clientName, 'pension')}' AND M.MDz_Status = 'A' AND M.MDz_Reversion_Client = ''`;

        errorMessage = `Unable to find a member with an active pension account and No Reversionary`;
        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved member with an active Pension Account and no existing Reversionary from Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);

        return queryResult[0]['MDz_Member'];
    }

    async getMemberWithAnActivePensionAccountAndAnExistingReversionary() {
        query = `Select TOP 1 * FROM Client AS C
                 INNER JOIN Member AS M
                 ON C.D2z_Client = M.MDz_Acct_No
                 WHERE M.MDz_Category = '${getClientCategory(clientName, 'pension')}' AND M.MDz_Status = 'A' AND M.MDz_Reversion_Client != ''`;

        errorMessage = `Unable to find a member with an active pension account and an existing reversionary`;
        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved member with an active Pension Account and an existing Reversionary from Database. 
                                        Member Number: ${(queryResult[0]['MDz_Member']).trim()} Client No: ${(queryResult[0]['D2z_Client']).trim()} | Name: ${(queryResult[0]['D2z_Given_Names']).trim()} ${(queryResult[0]['D2z_Surname']).trim()}`);

        return queryResult[0]['MDz_Member'];
    }

    async getReversionaryDetailsFromMemberNumber(memberNumber) {
        query = `SELECT FORMAT(D2d_Birth,'dd/MM/yyyy') as Formatted_D2d_Birth,
                 CONCAT(RTRIM(D2z_Address_Line_2),CHAR(10),RTRIM(D2z_Address_Line_3),CHAR(10),RTRIM(D2z_Suburb),' ',RTRIM(D2z_State),' ',RTRIM(D2z_Post_Code)) As Formatted_Full_Address,* 
                 FROM Client WHERE D2z_Client = 
                 (SELECT MDz_Reversion_Client FROM Member WHERE MDz_Category = '${await getClientCategory(clientName, 'pension')}' 
                 AND MDz_Status = 'A' AND MDz_Member = '${memberNumber}')`;

        errorMessage = `Unable to retrieve reversionary details for member : ${memberNumber}`;

        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        return queryResult;
    }

    async getPensionDetailsByMemberNumber(memberNumber) {
        query = `SELECT TOP 1 *,FORMAT(MDd_Pension_Start,'dd/MM/yyyy') AS Formatted_MDd_Pension_Start,
                 FORMAT(MDd_Next_Payment,'dd/MM/yyyy') AS Formatted_MDd_Next_Payment,
                 FORMAT(PEf_Net_Pension_Amt,'C')AS Formatted_PEf_Net_Pension_Amt,
                 FORMAT(PEf_Min_Pens_Yr,'C') AS Formatted_PEf_Min_Pens_Yr 
                 FROM Member AS M
                 INNER JOIN Mbr_Pension_History AS P
                 ON M.MDz_Member = P.PEz_Member
                 WHERE P.PEz_Member = '${memberNumber}' AND P.PEz_Fund= '${getClientFund(clientName, 'pension')}' ORDER BY PEd_Mod_Date DESC`;

        errorMessage = `Unable to retrieve pension details for ${memberNumber}`;
        queryResult = await runSqlQueryAndReturnResult(query, errorMessage);

        await e2eLogInfo(`Retrieved pension details for ${memberNumber}`);
        return queryResult;
    }

}