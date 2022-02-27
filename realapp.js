// const generatePage = require('./src/page_template');
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');

const managerTeam = [];
const engineerTeam = [];
const internTeam = [];

// const { writeFile, copyFile  } = require('./utils/generate-site.js');

const prompEngrTeamMember = (profileData) => { 
   console.log(`
   =====================
   Add a New Team Member
   =====================
   `);
   if (!profileData.teammembers) {
      profileData.teammembers = [];
   }
   return  inquirer
     .prompt([
         {
            type: 'input',
            name: 'name',
            message: 'What is the name of your team member? (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter the name of your team member:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'id',
            message: 'Provide the ID of the team member (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Provide the ID of the team member:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of your team member. (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter the email address of your team member:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'github',
            message: 'Enter the GitHub User-name of your team member. (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter GitHub User-name of your team member:");
                  return false;
               }
            }
         },
         // {
         //    type: 'confirm',
         //    name: 'feature',
         //    message: 'Would you like to feature this project?',
         //    default: false
         // },
         {
            type: 'confirm',
            name: 'confirmAddMember', // How can we use this info to control the flow of the application
            message: 'Would you like to enter another team member?',
            default: false
         }
      ])
     .then(engrMemberData => {
         profileData.teammembers.push(engrMemberData);
         var engineer = new Engineer(engrMemberData.name, engrMemberData.id, engrMemberData.email, engrMemberData.github);
         engineerTeam.push(engineer);
         if (engrMemberData.confirmAddMember) {
            return prompEngrTeamMember(profileData);
         }
         else {
            return profileData;
         }
      });
}

// prompEngrTeamMember().then(ansEntity => console.log(ansEntity));

const promtManagerClient = () => {
   return inquirer.prompt([
      {
         type: 'input',
         name: 'name',
         message: 'What is the name of the manager? (Required)',
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
         name: 'id',
         message: 'What is the ID of the manager (Required)',
         validate: idInput => {
            if(idInput){
               return true;
            }else{
               console.log("Please enter the ID of the manager: ");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'email',
         message: 'What is the email of the manager (Required): ',
         validate: emailInput => {
            if(emailInput){
               return true;
            }else{
               console.log("Please provide the email of the manager: ");
               return false;
            }
         }
      },
      {
         type: 'input',
         name: 'officeNumber',
         message: 'What is the office number of the manager: (Required): ',
         validate: officeNumberInput => {
            if(officeNumberInput){
               return true;
            }else{
               console.log("Please provide the office number of the manager: ");
               return false;
            }
         }
      } 
       
    ])
    .then(managerData => {
      var manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
      managerTeam.push(manager);
      return managerData;
   });
};

promtManagerClient()
   .then(prompEngrTeamMember)
   .then(profileDataColl => {
      // return generatePage(profileDataColl);
      console.log(profileDataColl);
      console.log(engineerTeam);
      console.log(managerTeam);
   })
   // .then(pageHTML => {
   //    return writeFile(pageHTML); // returns a Promise
   // })
   // .then(writeFileResponse => {
   //    console.log(writeFileResponse); //writeFileResponse is the object provided by the writeFile() function's resolve() execution
   //    return copyFile(); // returns a Promise
   // })
   // .then(copyFileResponse => {
   //    console.log(copyFileResponse); //copyFileResponse is the object provided by the copyFile() function's resolve() execution
   // })
   // .catch(err => {
   //    console.log(err);
   // });

