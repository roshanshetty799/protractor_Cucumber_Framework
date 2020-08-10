import {e2eLogError} from "./CustomLogger";
import {getWebServiceURL} from "../env/environmentProps";
import {SoapMethod} from "soap";
import * as soap from 'soap';
import {client, host} from "../hooks/preHooks";







/**
 *  Create a new SOAP client from the WSDL url
 *
 * @return soapOperation - Returns a SOAP Operation as a function object
 *
 * @param serviceName - The service name of a Web Service, typically found
 * at the end of an Web Service Endpoint
 *
 *
 * @param operationName - The SOAP operation that you wish to return
 * When the WSDL file is opened in a browser, the various operations are listed under the 'message' tag
*/
const getOperationByWSDLAndMessageName = (serviceName:string, operationName:string): Promise<SoapMethod> => {
    return new Promise((resolve, reject) => {
        soap.createClient(`http://${getWebServiceURL(client, host)}/${serviceName}?wsdl`, (err, client) => {
            if (err) {
                e2eLogError(err);
                reject(err);
            } else {
                resolve(client[operationName]);
            }
        });

    });
}

/**
 * @return array of objects. Objects are elements returned from the SOAP response.

 *
 *   @param soapOperation - Expects a SOAP operation as a function, as returned by function : getOperationByWSDLAndMessageName
 *
 *   @param soapRequestParameters - Expects the required SOAP parameters in the Request body
 *   For operation : getOperationByWSDLAndMessageName, a SOAP request body requires the below parameters
 *   for a successful response
 *
 * @param elementName - Collection of tags that you wish to return.
 *
 */
const getOperationResponseBody = (soapOperation:SoapMethod ,soapRequestArgs:object,elementName:string):Promise<object[]> => {
    return new Promise((resolve, reject) => {
        soapOperation(soapRequestArgs, (err, result) => {
            if (err) {
                e2eLogError(err);
                reject(err);
            } else {
                resolve(result['return'][elementName]);
            }

        });
    });
}


export const getSoapResponseByWSDLAndOperation = async (serviceName: string,operationName:string,soapRequestArgs:object,elementName:string):Promise<object[]> =>
    getOperationResponseBody(await getOperationByWSDLAndMessageName(serviceName,operationName),soapRequestArgs,elementName);











