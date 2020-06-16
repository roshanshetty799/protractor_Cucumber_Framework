# super-AOL-e2e-automation

## Description
    This Test Automation Framework makes it possible to run E2E test scenarios on AOL website accross multiple
    environments.The foundations of the framework are built upon two open source tools Protractor and
    Cucumber. Protractor allows you to interact with the browser like a user would and 
    Cucumber helps organising the test scenarios in an easy readable format. 
     
### Project Overview

     .  
        ├── reports                # Contains E2E run report. This dir is not checked in and will be created after the first run
        ├── src                    
        │   ├── env                # Environment details are configured in environmentProps.json file located here
        │   ├── hooks              # Functions/Calls to be made before/after scenarios are stored here
        │   ├── pageObjects        # Element locators and functions to perform actions on the application
        │   ├── stepDefinitions    # Cucumber Step definitions are detailed here
        │   ├── testCases          # Test Scenarios can be found under this dir  
        │   ├── utils              # Helper functions for the framework
        │   └── wrappers           # Native functions for browser,SQL Driver etc. are wrapped in a custom function                
        ├── e2e.log                # Logs generated after each run are appended to this file.
        ├── protractor.conf.ts     # Protractor run configuration details
        └── ...
        
### Quick Start 
     
   > Pre-requisite
     
     1. Node.js is installed. This lets you run javascript code outside of the browser which is what the whole framework is built upon.
        You can install it from here : https://nodejs.org/en/ (Download the 'LTS' version)
     
     2. Git is installed - https://git-scm.com/downloads 
     

        
   > Running E2E test suite
      
      Test Scenarios can be found under dir 'testCases'. They are further categorised as per client name. 
      
      To run the suite : 
      
      1. Clone this project : https://github.com/oneiress/super-aol-e2e-automation.git
         To clone this to your system, open cmd or Git Bash and enter the following : 
              ```
              git clone https://github.com/oneiress/super-aol-e2e-automation.git
              ```
      
      2. Navigate inside 'super-aol-e2e-automation' dir that you just cloned. 
      
      3. Open cmd or Git Bash and type the following command : npm install. This would install all the necessary dependencies
         Wait till you receive a success message. 
      
      4. Type the following command : 
         npm test -- --params.clientName <clientName> --params.hostName <hostName> --suite <suiteName> 
       (Tailor the command as per your requirement with the options available below)
       
       clientName : ing / statewide
       hostName   : webdev / websupport        
       suite      : ing / statewide
      
      For example : If you wish to run the ing suite accross websupport on ING - AOL then the command line parameters would 
      look as follows : npm test -- --params.clientName ing --params.hostName websupport --suite ing 
      
      5. The browser should open up and text execution would begin. You can keep an eye on the console while the execution is 
      in progress to monitor which step it is on. Once execution is complete, an execution report can be found under 'reports' dir.
      Open 'index.html' file in a browser to view it.  