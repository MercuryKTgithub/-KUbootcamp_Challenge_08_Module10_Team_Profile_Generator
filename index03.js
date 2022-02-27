const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page_template');
const engineerTeam = [];
const internTeam = [];

const questionsForIntern = [
   {
      type: 'input',
      name: 'name',
      message: '>>>--- What is the name of the intern (Required)',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please enter the name of the intern: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'id',
      message: '>>>--- What is the ID of the intern (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the ID of the intern: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'email',
      message: '>>>--- What is the email of the intern (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the email of the intern: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'school',
      message: '>>>--- What is school the intern is currently enrolled at: (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the school the intern is currently enrolled at: ");
            return false;
         }
      }
   },    
   {
      type: 'list',
      message: 'The intern team-member has been added. What would you like to do next?',
      name: 'action',
      choices: ['Add an Engineer', 'Add an Intern']
   }
];

const questionsForManager = [
   {
      type: 'input',
      name: 'managerName',
      message: "What is the name of the manager (Required)",
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please enter the name of the manager: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'managerId',
      message: "What is the ID of the manager (Required): ",
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the ID of the manager: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'managerEmail',
      message: 'What is the email of the manager (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the email of the manager: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'office',
      message: 'What is the office number of the manager: (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the office number of the manager: ");
            return false;
         }
      }
   }
];

const questionsForEngineer = [
   {
      type: 'input',
      name: 'name',
      message: '>>>--- What is the name of the engineer (Required)',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please enter the name of the engineer: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'id',
      message: '>>>--- What is the ID of the engineer (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the ID of the engineer: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'email',
      message: '>>>--- What is the email of the engineer (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the email of the engineer: ");
            return false;
         }
      }
   },
   {
      type: 'input',
      name: 'github',
      message: '>>>--- What is the GitHub User-name of the engineer: (Required): ',
      validate: nameInput => {
         if(nameInput){
            return true;
         }else{
            console.log("Please provide the GitHub user-name of the engineer: ");
            return false;
         }
      }
   }
   ,
   {
      type: 'confirm',
      name: 'confirmAddMember', // How can we use this info to control the flow of the application
      message: '>>>--- Would you like to enter another engineer team-member?',
      default: false
   }
   // {
   //    type: 'list',
   //    message: 'The engineer team-member has been added. What would you like to do next?',
   //    name: 'action',
   //    choices: ['Add an Engineer', 'Add an Intern']
   // }
];

const promptManagerProfileGenerator = () => {
   console.log(`
  .------------------------------------------------------------------------------.
  |                            Team Profile Generator                            |
  '------------------------------------------------------------------------------'
   `);
   return inquirer
     .prompt([
         questionsForManager[0],
         questionsForManager[1],
         questionsForManager[2],
         questionsForManager[3]  
        
      ])     
}

const promptEngineerProfileGenerator = (employeeData) => {
   // if(!employeeData.engrTeam){
   //    employeeData.engrTeam = [];
   // }
   return inquirer
     .prompt([
      {
         type: 'input',
         name: 'name',
         message: '>>>--- What is the name of the engineer (Required)',
         validate: nameInput => {
            if(nameInput){
               return true;
            }else{
               console.log("Please enter the name of the engineer: ");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'id',
         message: '>>>--- What is the ID of the engineer (Required): ',
         validate: nameInput => {
            if(nameInput){
               return true;
            }else{
               console.log("Please provide the ID of the engineer: ");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'email',
         message: '>>>--- What is the email of the engineer (Required): ',
         validate: nameInput => {
            if(nameInput){
               return true;
            }else{
               console.log("Please provide the email of the engineer: ");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'github',
         message: '>>>--- What is the GitHub User-name of the engineer: (Required): ',
         validate: nameInput => {
            if(nameInput){
               return true;
            }else{
               console.log("Please provide the GitHub user-name of the engineer: ");
               return false;
            }
         }
      }
      ,
      {
         type: 'confirm',
         name: 'confirmAddMember', // How can we use this info to control the flow of the application
         message: '>>>--- Would you like to enter another engineer team-member?',
         default: false
      }
   ]) 
   .then(engrData => {
      engineerTeam.push(engrData);
      if (projectData.confirmAddProject) {
         return promptEngineerProfileGenerator(employeeData);
      }
      else {
         return employeeData;
      }
   });       
}

// // function managerHelpdesk () {
// //    inquirer
// //       .prompt({
// //          type: 'list',
// //          message: 'What would you like to do next?',
// //          name: 'action',
// //          choices: ['Add an Engineer', 'Add an Intern', 'I am finished']
// //       })
// //    .then(({ action }) => {
// //       if (action === 'Add an Engineer') {
// //          let engineer = null;
// //          promptEngineerProfileGenerator()
// //          .then(engineerData => {
// //             employeeData.engr.push(engineerData);
// //             engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github)
// //             if(engineerData.confirmAddMember){
// //                return promptEngineerProfileGenerator(employeeData);
// //             }
// //             else{
// //                return employeeData;
// //             }
// //          })
// //       } else {
// //         var emp = '';
// //       }
// //    }); 
// //  };

const managerHelpdesk = () => {
   inquirer
      .prompt(
         {
         type: 'list',
         name: 'action',
         message: 'What would you like to do next?',
         choices: ['Add an Engineer', 'Add an Intern']
         })
      .then(({ action }) => {
         if (action === 'Add an Engineer') {
            let engineer = null;
            promptEngineerProfileGenerator()
            .then(engineerData => {
               // employeeData.engr.push(engineerData);
               engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
               engineerTeam.push(engineer);  
               // while(engineerData.confirmAddMember){
               //    promptEngineerProfileGenerator()
               //    .then(engrData => {
               //       engineer = new Engineer(engrData.name, engrData.id, engrData.email, engrData.github);
               //       engineerTeam.push(engineer)
               //    })
               // }

                  
            //    while(({ option } = engineerData.action) === 'Add an Engineer')
            //    {
            //       promptEngineerProfileGenerator()
            //       .then(engrData => {
            //          engineer = new Engineer(engrData.name, engrData.id, engrData.email, engrData.github);
            //          engineerTeam.push(engineer);  
            //       })
            //  
            //    }
               
            })
         } 
         else if (action === 'Add an Intern'){
            promptInternProfileGenerator()
            .then(internData => {
               var intern = new Intern(internData.name, internData.id, internData.email, internData.school);
               internTeam.push(intern);  
            })
         }
      }); 
 };

const promptInternProfileGenerator = () => {
   // if(!employeeData.engr){
   //    employeeData.engr = [];
   // }
   return inquirer
     .prompt([
         questionsForIntern [0],
         questionsForIntern [1],
         questionsForIntern [2],
         questionsForIntern [3],
         questionsForIntern [4]
      ])     
   // console.log("Intern option chosen!")
}

 
promptManagerProfileGenerator()
.then(managerHelpdesk)

 