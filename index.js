const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const fs = require('fs');
const generatePage = require('./src/page_template.js');

const managerTeam = [];
const engineerTeam = [];
const internTeam = [];

const prompInternTeamMember = (profileData) => { 
   console.log(`
   ===----------------------------===
       Add an Intern Team Member
   ===----------------------------===
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
            name: 'confirmAddMember', 
            message: 'Would you like to enter another intern?',
            default: false
         }
      ])
      .then(internMemberData => {
         // // profileData.teammembers.push(internMemberData);
         var intern = new Intern(internMemberData.name, internMemberData.id, internMemberData.email, internMemberData.school);
         internTeam.push(intern);
         if (internMemberData.confirmAddMember) {
            return prompInternTeamMember(profileData);
         }
         else {
            inquirer
            .prompt({
               type: 'confirm',
               name: 'confirmWantEngr', 
               message: 'Would you like to add an Engineer Team Member? [No to End]',
               default: false
            })
            .then(ansCont => {
               if(ansCont.confirmWantEngr){
                  return prompEngrTeamMember(profileData);
               }
               else{
                  peekResult();
               }
            })
         } // end of else
      });
}   
 

const prompEngrTeamMember = (profileData) => { 
   console.log(`
   ===-----------------------------===
      Add an Engineer Team Member
   ===-----------------------------===
   `);
   // // if (!profileData.teammembers) {
   // //    profileData.teammembers = [];
   // // }
   return  inquirer
     .prompt([
         {
            type: 'input',
            name: 'name',
            message: 'What is the name of your engineer team member? (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter the name of your engineer team member:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'id',
            message: 'Provide the ID of the engineer team member (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Provide the ID of the engineer team member:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of your engineer team member. (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter the email address of your engineer team member:");
                  return false;
               }
            }
         },
         {
            type: 'input',
            name: 'github',
            message: 'Enter the GitHub User-name of your engineer team member. (Required)',
            validate: nameInput => {
               if(nameInput){
                  return true;
               }else{
                  console.log("Please enter GitHub User-name of your engineer team member:");
                  return false;
               }
            }
         },
         {
            type: 'confirm',
            name: 'confirmAddMember', 
            message: 'Would you like to enter another engineer team member?',
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
            inquirer
            .prompt({
               type: 'confirm',
               name: 'confirmWantIntern', 
               message: 'Would you like to add an Intern Team Member? [No to End]',
               default: false
            })
            .then(ansCont => {
               if(ansCont.confirmWantIntern){
                  return prompInternTeamMember(profileData);
               }
               else{
                  peekResult();
               }
            })
         }
      });
}

// prompEngrTeamMember().then(ansEntity => console.log(ansEntity));

const promtManagerClient = () => {
   console.log(`
  .------------------------------------------------------------------------------.
  |                            Team Profile Generator                            |
  '------------------------------------------------------------------------------'
   `);
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

// //////////////////// testing data on the fly only ///////////////////////////
// const mgr = 
// {
//    name: "Jane Jackson",
//    id: "203J",
//    email: "JJ@@cypresstech.com",
//    officeNumber: "R-101"
// };
// 
// managerTeam.push(mgr);
//  
// var engr1 = {
//    name: "Mike Swanson",
//    id: "101M",
//    email: "mike@@cypresstech.com",
//    github: "mikeGH"
// };
// var engr2 = {
//    name: "Tracy Tranz",
//    id: "102T",
//    email: "TracyTr@@cypresstech.com",
//    github: "MercuryKTgithub"
// };
// var engr3 = {
//    name: "Benson J. Lee",
//    id: "108T",
//    email: "BensonJL@@cypresstech.com",
//    github: "BensonGH"
// };
// 
// engineerTeam.push(engr1);
// engineerTeam.push(engr2);
// engineerTeam.push(engr3);
// 
// var intern1 = {
//    name: "Kayla Khan",
//    id: "IT100",
//    email: "Kayla@@cypresstech.com",
//    school: "Friends University"
// };
// 
// var intern2 = {
//    name: "David Brown",
//    id: "IT100",
//    email: "DavidInt@@cypresstech.com",
//    school: "Newman University"
// };
// 
// internTeam.push(intern1);  
// internTeam.push(intern2);  
// console.log("Sample Test Begins!")
// peekResult();
// //////////////////// testing data ends ///////////////////////////

function peekResult(){
   console.log(managerTeam);
   console.log(engineerTeam);  
   console.log(internTeam);  
   const pageHTML = generatePage(managerTeam[0], engineerTeam, internTeam);
   fs.writeFile('dist/myteam.html', pageHTML, err => 
   {
   if (err) throw new Error(err);
   console.log('Page created! Check out myteam.html in dist directory to see it!');
   });
}

promtManagerClient()
   .then(action => {
      // console.log("Action value: " + action);
      if (action === 'Add an Engineer'){
         prompEngrTeamMember();  
         
      }
      else {
         // console.log("Action value: " + action);
         prompInternTeamMember();
      }
     
   })
   .catch(err => {
      console.log(err);
   });

 


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

