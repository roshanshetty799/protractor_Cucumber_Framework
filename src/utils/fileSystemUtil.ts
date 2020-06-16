/*
* Author     : Roshan S.
* Description: This file contains file system functions which can be used across the framework
* */

const fs = require('fs-extra');


/* Creates a new folder/directory at the specified path */
export const createNewDir = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}






