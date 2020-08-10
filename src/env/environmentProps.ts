/*
    This file contains functions to retrieve environment details from environmentProps.json file
    The details retrieved would be dependant on the parameters passed via npm during test run initiation. If no parameters are passed then the default params in protractor.conf.ts file will be used.
 */

import * as envProps from "../../src/env/environmentProps.json";

export const getSqlServerName = (clientName, hostName) => envProps[clientName].host[hostName].sqlServer;
export const getSqlDatabaseName = (clientName, hostName) => envProps[clientName].host[hostName].database;
export const getClientUsername = (clientName) => envProps[clientName].login.username;
export const getClientPassword = (clientName) => envProps[clientName].login.password;
export const getBaseURL = () => envProps.baseURL;
export const getWebServiceURL = (clientName,hostName)=> envProps[clientName].host[hostName].webService;


