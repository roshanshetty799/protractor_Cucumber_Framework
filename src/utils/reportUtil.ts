/*
 Author      : Roshan S.
 Description : This file contains configuration details for Test Execution Report creation.
*/


import {browser} from "protractor";
import {getformattedCurrentDateAndTime} from "./dateUtil";

const report = require('multiple-cucumber-html-reporter');
export const currentDateAndTime = getformattedCurrentDateAndTime();

/* Generates an html report by reading the report.json file
   located under src/reports/<Current Date and Time>/ which gets created post e2e execution
*/
export const generateHtmlReport = () => {

    let browserName, browserVersion, platform, platformVersion;
    browser.getCapabilities().then(async (caps) => {
        browserName = await caps.get('browserName');
        browserVersion = await caps.get('version');
        platform = await caps.get('platform');
        platformVersion = await caps.get('appVersion');

        /*
        MetaData key-value pair for the html report
        */

        report.generate({
            jsonDir: './reports/' + currentDateAndTime + '/',
            reportPath: './reports/' + currentDateAndTime + '/',
            openReportInBrowser: true,
            reportName: 'AOL E2E Automation report',
            pageTitle: 'Automation report',
            pageFooter: '<div><p> Custom footer test </p></div>',
            displayDuration: true,
            durationInMs:true,
            metadata: {
                browser: {
                    name: browserName,
                    version: browserVersion
                },
                device: 'Local test machine',
                platform: {
                    name: platform,
                }
            }
        });

    });
}





