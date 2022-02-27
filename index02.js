const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');

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
   // ,
   // {
   //    type: 'list',
   //    name: 'action',
   //    message: 'The engineer team-member has been added. What would you like to do next?',
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
         questionsForManager[3],
         questionsForManager[4]   
      ])     
}

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


const promptEngineerProfileGenerator = (employeeData) => {
   if(!employeeData.engrTeam){
      employeeData.engrTeam = [];
   }
   return inquirer
     .prompt([
         questionsForEngineer[0],
         questionsForEngineer[1],
         questionsForEngineer[2],
         questionsForEngineer[3],
         questionsForEngineer[4]
      ]) 
   .then(engrData => {
      employeeData.engrTeam.push(engrData);
      if (projectData.confirmAddProject) {
         return promptEngineerProfileGenerator(employeeData);
      }
      else {
         return employeeData;
      }
   });       
}


const promptManagerHelpdesk = () => {
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
            return promptEngineerProfileGenerator()
         } 
         else if (action === 'Add an Intern'){
            // promptInternProfileGenerator()
            // .then(internData => {
            //    var intern = new Intern(internData.name, internData.id, internData.email, internData.school);
            //    internTeam.push(intern);  
            // })
         }
      }); 
};


promptManagerProfileGenerator()
   .then(managerData => {
      promptManagerHelpdesk()
   })
   .then(employeeData => {
      console.log(employeeData);
   })
       