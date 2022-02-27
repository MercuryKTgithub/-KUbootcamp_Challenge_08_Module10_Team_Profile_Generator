// const generatePage = require('./src/page_template');
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');

const managerTeam = [];
const engineerTeam = [];
const internTeam = [];

// const { writeFile, copyFile  } = require('./utils/generate-site.js');
const prompInternTeamMember = (profileData) => { 
   console.log(`
   =========================
   Add an Intern Team Member
   =========================
   `);
   // // if (!profileData.teammembers) {
   // //    profileData.teammembers = [];
   // // }
   return  inquirer
      .prompt([
         {
            type: 'input',
            name: 'name',
            message: 'What is the name of your intern? (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter the name of your intern:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'id',
            message: 'Provide the ID of the intern (Required)',
            validate: idInput => {
               if(idInput){
                  return true;
               }else{
                  console.log("Provide the ID of the intern:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of your intern. (Required)',
            validate: emailInput => {
               if(emailInput){
                  return true;
               }else{
                  console.log("Please enter the email address of your intern:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'school',
            message: 'Enter the school-name of your intern. (Required)',
            validate: schoolInput => {
               if(schoolInput){
                  return true;
               }else{
                  console.log("Please enter the school-name of your intern:");
                  return false;
               }
            }
         },
         {
            type: 'confirm',
            name: 'confirmAddMember', // How can we use this info to control the flow of the application
            message: 'Would you like to enter another intern?',
            default: false
         }
      ])
      .then(internMemberData => {
         // // profileData.teammembers.push(internMemberData);
         var intern = new Engineer(internMemberData.name, internMemberData.id, internMemberData.email, internMemberData.github);
         internTeam.push(intern);
         if (internMemberData.confirmAddMember) {
            return prompInternTeamMember(profileData);
         }
         else {
            return profileData;
         }
      });
}   
 

const prompEngrTeamMember = (profileData) => { 
   console.log(`
   ===========================
   Add an Engineer Team Member
   ===========================
   `);
   // // if (!profileData.teammembers) {
   // //    profileData.teammembers = [];
   // // }
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
         // // profileData.teammembers.push(engrMemberData);
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
   // inquirer.prompt([
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
      ,
      {
         type: 'list',
         message: 'What would you like to do?',
         name: 'action',
         choices: ['Add an Intern', 'Add an Engineer']
      } 
       
    ])
   // //  .then(({action, ...managerData}) => {
   // //    console.log("Values of 3-dot: " +  {...managerData.name.toString()})
   // //    var manager = new Manager(...managerData.name, ...managerData.id, ...managerData.email, ...managerData.officeNumber);
   // //    managerTeam.push(manager);
   // //    return action;
   .then(({action, name, id, email, officeNumber}) => {
      var manager = new Manager(name, id, email, officeNumber);
      managerTeam.push(manager);
      return action;
      
   });
};



function checkRequestStatus(){
   console.log(managerTeam);
   console.log(engineerTeam);  
}

promtManagerClient()
   .then(action => {
      console.log("action value: " + action);
      if (action === 'Add an Engineer'){
         prompEngrTeamMember(); // console.log("Result Data is: " + data); // promise
         // .then(dataEngr =>{
         //    console.log(dataEngr);
         //    return dataEngr;
         // })
         checkRequestStatus();
      }
      else {
         // checkRequestStatus();
         // console.log("action value: " + action);
         prompInternTeamMember();
         // .then(dataIntern =>{
         //    console.log(dataIntern);
         //    return dataIntern;
         // })
         
      }
      // console.log(managerTeam);
      // console.log(engineerTeam);
   });
 
   // .then(prompEngrTeamMember)
   // .then((profileDataColl) => {
   //    // return generatePage(profileDataColl);
   //    console.log(profileDataColl);
   //    console.log(managerTeam);
   //    console.log(engineerTeam);
   // });

   


// // promtManagerClient()
// //    .then(prompEngrTeamMember)
// //    .then(profileDataColl => {
// //       // return generatePage(profileDataColl);
// //       console.log(profileDataColl);
// //       console.log(engineerTeam);
// //       console.log(managerTeam);
// //    })
// //    // .then(pageHTML => {
// //    //    return writeFile(pageHTML); // returns a Promise
// //    // })
// //    // .then(writeFileResponse => {
// //    //    console.log(writeFileResponse); //writeFileResponse is the object provided by the writeFile() function's resolve() execution
// //    //    return copyFile(); // returns a Promise
// //    // })
// //    // .then(copyFileResponse => {
// //    //    console.log(copyFileResponse); //copyFileResponse is the object provided by the copyFile() function's resolve() execution
// //    // })
// //    // .catch(err => {
// //    //    console.log(err);
// //    // });
