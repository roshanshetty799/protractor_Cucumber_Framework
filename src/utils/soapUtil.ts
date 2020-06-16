import {e2eLogError} from "../wrappers/CustomLogger";

const soap = require('soap');

/*
    Returns a soap operation
 */
const getOperationByWSDLAndMessageName = (initial_WSDL,operationName):Promise<string[]> => {
    return new Promise((resolve, reject) => {
        soap.createClient(initial_WSDL, (err, client) => {
            if (err) {
                e2eLogError(err);
                reject(err);
            } else {
                resolve(client[operationName]);
            }
        });

    });
}



const getOperationResponseBody = (soapOperation,soapBodyArguments,elementName) : Promise<string[]> => {
    return new Promise((resolve, reject) => {
        soapOperation(soapBodyArguments, (err, result) => {
            if (err) {
                e2eLogError(err);
                reject(err);
            } else {
                resolve(result['return'][elementName]);
            }

        });
    });
}

export const getSoapElementByWSDLAndOperation = async (wsdl,operationName,soapBodyArguments,elementName): Promise<string[]>=> {
    let soapOperation = await getOperationByWSDLAndMessageName(wsdl,operationName);
    return getOperationResponseBody(soapOperation,soapBodyArguments,elementName);
}










