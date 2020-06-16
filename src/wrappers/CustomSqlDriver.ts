/*
* Author      : Roshan S.
* Description : This file contain configuration details and functions to query/update the SQL database. The actual environment details are fetched from the environment.json file
*               located under ./src/env/ .
* */

import * as assert from "assert";
import {e2eLogError} from "./CustomLogger";


import {browser} from "protractor";
import {getSqlDatabaseName, getSqlServerName} from "../env/environmentProps";


const sql = require("msnodesqlv8");
let clientName = browser.params.clientName;
let hostName = browser.params.hostName;

const connectionString = `server=${getSqlServerName(clientName, hostName)};Database=${getSqlDatabaseName(clientName, hostName)};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}`;

 /* Queries the database and returns the result set as an array with each row as a Javascript object.
 */
export const runSqlQueryAndReturnResult = (query, errorMessage) => {

    return new Promise((resolve, reject) => {

        sql.query(connectionString, query, (err, res) => {
            // Throws error if connection to the database is unsuccessful

            assert.ifError(err);

            // Returns a rejected promise if the query does not return any data
            if (res.length < 1) {
                e2eLogError(errorMessage);
                reject(errorMessage);
            } else {
                resolve(res);
            }
        });
    });
}

 /* This function can be used to run 'Update' sql queries against the database
 */
export const runUpdateSqlQuery = (query, errorMessage) => {

    return new Promise((resolve, reject) => {

        sql.query(connectionString, query, (err, res) => {
            // Throws error if connection to the database is unsuccessful
            if (err) {
                e2eLogError(`${errorMessage}  SQL Error : ${err}`);
                reject(errorMessage);
            } else {
                resolve(res);
            }
            // Returns a rejected promise if the query does not return any data
        });
    });
}


