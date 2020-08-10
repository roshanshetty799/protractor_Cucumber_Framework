# Protractor-Cucumber E2E-automation framework


## Description

This Test Automation Framework makes it possible to run E2E test scenarios on Web Applications.The foundations of the framework are built upon two open source     tools Protractor and Cucumber. Protractor allows you to interact with the browser like a user would and Cucumber helps organising the test scenarios in an easy readable format. 
  Protractor is built for angular website and thus the framework won't need any custom wait/sleep method to your tests however I wanted the framework to be compatible with non-angular websites as well and so the framework has custom wait methods which are wrapped with browser(driver) calls. Report is generated after every run with the current Date and time. Framework has support for Database and SOAP calls.  	
	
	   
     
### Project Overview

     .  
        ├── reports                # Contains E2E run report. This directory is not checked in and will be created after the first run
	├── logs                   # Every driver action generates a custom log which is captured in this directory
        ├── src                    
        │   ├── env                # Environment details are configured in environmentProps.json file located here.
        │   ├── hooks              # Functions/Calls to be made before/after scenarios are stored here
        │   ├── pageObjects        # Element locators and functions to perform actions on the application
        │   ├── stepDefinitions    # Cucumber Step definitions are detailed here
        │   ├── testCases          # Test Scenarios can be found under this dir  
	│   ├── testRunner         # The Framework is designed to run on multiple environments. Each testRunner file would hold run parameter for one env. 
        │   ├── utils              # Helper functions for the framework
        │   └── wrappers           # Native functions for browser,SQL Driver,SOAP,WAIT etc. are wrapped in a custom function                
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
      
      1. Clone this project : https://github.com/roshanshetty799/protractor_Cucumber_Framework.git
         To clone this to your system, open cmd or Git Bash and enter the following : 
              ```
              git clone https://github.com/roshanshetty799/protractor_Cucumber_Framework.git
              ```
      
      2. Navigate inside 'protractor_Cucumber_Framework' dir that you just cloned. 
      
      3. Open cmd or Git Bash and type the following command : npm install. This would install all the necessary dependencies
         Wait till you receive a success message. 
      
      
	  4. Go to ./src/testRunner and double click on any of the runner file. These would run a sample test case depending 
	     upon which one you run. 
       
  
      5. The browser should open up and text execution would begin. You can keep an eye on the console while the execution is 
      in progress to monitor which step it is on. Once execution is complete, an execution report can be found under 'reports' dir.
      Open 'index.html' file in a browser to view it.  
	  
	  
	  
