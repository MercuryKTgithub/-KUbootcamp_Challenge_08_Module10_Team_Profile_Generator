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
            message: 'What is the name of your intern [First Last]? (Required)',
            validate: (nameInput) => {
               // [a-zA-Z]{3,} meaning 3 or more ASCII letters, apostrophe, and dot count
               // ^ - start of string // $ - end of string.              
               const atleast3alphachars = /^([a-zA-Z.']{2,}\s[a-zA-Z.']{1,})\s?([a-zA-Z.']{1,})?$/   // Could take in a mid name/ second surname
               if(!atleast3alphachars.test(nameInput))
               {
                  console.log(`\n>> Please provide at least: \n   2 non-numeric characters for First Name \n   1 non-numeric character for Last Name  <<\n>> Apostrophe (') and dot (.) are allowed as special characters <<`);
                  // console.log(`\n>> Please provide at least 2 non-numeric characters for First Name and 1 non-numeric character for Last Name  <<\n>> Apostrophe (') and dot (.) are allowed as special characters <<`);
                  return false;               
               } else if (nameInput.includes("'.") || nameInput.includes(".'") || nameInput.includes("..") || nameInput.includes("''")){
                  console.log(`\n>> Please provide at least 2 non-numeric characters for the first name <<\n>> Apostrophe (') and dot (.) cannot be adjacent nor consecutive <<`);
                  return false; 
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'id',
            message: 'Provide the ID of the intern (Required)',
            validate: (idInput) => {
               // [a-zA-Z0-9]{2,} meaning 2 or more alpha numeric ASCII letters, no special characters except hyphen and pound are allowed
               // ^ - start of string // $ - end of string.              
               const atleast2alphanumeric = /^[a-zA-Z0-9-#]{3,}$/
               if(!atleast2alphanumeric.test(idInput))
               {
                  console.log(`\n>> Please provide at least 3 alpha-numeric and non-special characters only for ID input <<\n>> Hyphen (-) and hash (#) are allowed as special characters <<`);
                  return false;
               }else if (idInput.includes("#-") || idInput.includes("-#") || idInput.includes("--") || idInput.includes("##")){
                  console.log(`\n>> Please provide at least 3 non-numeric and non-special characters only for ID input <<\n>> Hyphen (-) and hash (#) cannot be adjacent nor consecutive <<`);
                  return false; 
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of your intern. (Required)',
            validate: emailInput => {
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/           
               if(!emailRegex.test(emailInput))
               {
                  console.log("\n>> Please provide a valid email address for the manager <<");
                  return false;
               }else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'school',
            message: 'Enter the school-name of your intern. (Required)',
            validate: schoolInput => {
               const atleast3alphachars = /^[a-zA-Z\s'.]{3,}$/
               if(!atleast3alphachars.test(schoolInput))
               {
                  console.log(`\n>> Please provide at least 3 non-numeric and non-special characters only for the school-name input <<\n>> Apostrophe (') and dot (.) cannot be adjacent nor consecutive  <<`);
                  return false;               
               }else if (schoolInput.includes("'.") || schoolInput.includes(".'") || schoolInput.includes("..") || schoolInput.includes("''")){
                  console.log(`\n>> Please provide at least 3 non-numeric and non-special characters only for the school-name input <<\n>> Apostrophe (') and dot (.) cannot be adjacent nor consecutive <<`);
                  return false; 
               }
               else{
                  return true;
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
            message: 'What is the name of your engineer team member [First Last]? (Required)',
            validate: (nameInput) => {
               // [a-zA-Z]{3,} meaning 3 or more ASCII letters, apostrophe, and dot count
               // ^ - start of string // $ - end of string.              
               const atleast3alphachars = /^([a-zA-Z.']{2,}\s[a-zA-Z.']{1,})\s?([a-zA-Z.']{1,})?$/   // Could take in a mid name/ second surname
               if(!atleast3alphachars.test(nameInput))
               {
                  console.log(`\n>> Please provide at least: \n   2 non-numeric characters for First Name \n   1 non-numeric character for Last Name  <<\n>> Apostrophe (') and dot (.) are allowed as special characters <<`);
                  // console.log(`\n>> Please provide at least 2 non-numeric characters for First Name and 1 non-numeric character for Last Name  <<\n>> Apostrophe (') and dot (.) are allowed as special characters <<`);
                  return false;               
               } else if (nameInput.includes("'.") || nameInput.includes(".'") || nameInput.includes("..") || nameInput.includes("''")){
                  console.log(`\n>> Please provide at least 2 non-numeric characters for the first name <<\n>> Apostrophe (') and dot (.) cannot be adjacent nor consecutive <<`);
                  return false; 
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the engineer team member (Required)',
            validate: (idInput) => {
               // [a-zA-Z0-9]{2,} meaning 2 or more alpha numeric ASCII letters, no special characters except hyphen and pound are allowed
               // ^ - start of string // $ - end of string.              
               const atleast2alphanumeric = /^[a-zA-Z0-9-#]{3,}$/
               if(!atleast2alphanumeric.test(idInput))
               {
                  console.log(`\n>> Please provide at least 3 alpha-numeric and non-special characters only for ID input <<\n>> Hyphen (-) and hash (#) are allowed as special characters <<`);
                  return false;
               }else if (idInput.includes("#-") || idInput.includes("-#") || idInput.includes("--") || idInput.includes("##")){
                  console.log(`\n>> Please provide at least 3 non-numeric and non-special characters only for ID input <<\n>> Hyphen (-) and hash (#) cannot be adjacent nor consecutive <<`);
                  return false; 
               }
               else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'email',
            message: 'Enter the email address of your engineer team member. (Required)',
            validate: emailInput => {
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/           
               if(!emailRegex.test(emailInput))
               {
                  console.log("\n>> Please provide a valid email address for the manager <<");
                  return false;
               }else{
                  return true;
               }
            }
         },
         {
            type: 'input',
            name: 'github',
            message: 'Enter the GitHub User-name of your engineer team member. (Required)\n ',
            validate: githubInput => {
               const githubUserNameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/ // Curtesy of https://github.com/shinnn/github-username-regex edit: add A-Z to allow capital letter
               if(!githubUserNameRegex.test(githubInput))
               {
                  console.log(`
                  \n>> Please provide a valid GibHub Username input <<
                  \t[ Please ensure a Github Username: ]
                  \t>> may only contain alphanumeric characters or hyphens << 
                  \t>> cannot have multiple consecutive hyphens <<
                  \t>> cannot begin or end with a hyphen <<
                  \t>> cannot exceed 39 characters in length << 
                  `);
                  return false;
               }else{
                  return true;
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
  .-------------------------------------------------------------------------.
  |                         Team Profile Generator                          |
  '-------------------------------------------------------------------------'
   `);
   return inquirer.prompt([
   // inquirer.prompt([     
      {
         type: 'input',
         name: 'name',
         message: 'What is the name of the manager [First Last]? (Required)',
         validate: (nameInput) => {
            // [a-zA-Z]{3,} meaning 3 or more ASCII letters, apostrophe, and dot count
            // ^ - start of string // $ - end of string.              
            const atleast3alphachars = /^([a-zA-Z.']{2,}\s[a-zA-Z.']{1,})\s?([a-zA-Z.']{1,})?$/   // Could take in a mid name/ second surname
            if(!atleast3alphachars.test(nameInput))
            {
               console.log(`\n>> Please provide at least: \n   2 non-numeric characters for First Name \n   1 non-numeric character for Last Name  <<\n>> Apostrophe (') and dot (.) are allowed as special characters <<`);
               // console.log(`\n>> Please provide at least 2 non-numeric characters for First Name and 1 non-numeric character for Last Name  <<\n>> Apostrophe (') and dot (.) are allowed as special characters <<`);
               return false;               
            } else if (nameInput.includes("'.") || nameInput.includes(".'") || nameInput.includes("..") || nameInput.includes("''")){
               console.log(`\n>> Please provide at least 2 non-numeric characters for the first name <<\n>> Apostrophe (') and dot (.) cannot be adjacent nor consecutive <<`);
               return false; 
            }
            else{
               return true;
            }
         }
      },
      {
         type: 'input',
         name: 'id',
         message: 'What is the ID of the manager (Required)',
         validate: (idInput) => {
            // [a-zA-Z0-9]{2,} meaning 2 or more alpha numeric ASCII letters, no special characters except hyphen and pound are allowed
            // ^ - start of string // $ - end of string.              
            const atleast2alphanumeric = /^[a-zA-Z0-9-#]{3,}$/
            if(!atleast2alphanumeric.test(idInput))
            {
               console.log(`\n>> Please provide at least 3 alpha-numeric and non-special characters only for ID input <<\n>> Hyphen (-) and hash (#) are allowed as special characters <<`);
               return false;
            }else if (idInput.includes("#-") || idInput.includes("-#") || idInput.includes("--") || idInput.includes("##")){
               console.log(`\n>> Please provide at least 3 non-numeric and non-special characters only for ID input <<\n>> Hyphen (-) and hash (#) cannot be adjacent nor consecutive <<`);
               return false; 
            }
            else{
               return true;
            }
         }
      },
      {
         type: 'input',
         name: 'email',
         message: 'What is the email of the manager (Required): ',
         validate: (emailInput) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/           
            if(!emailRegex.test(emailInput))
            {
               console.log("\n>> Please provide a valid email address for the manager <<");
               return false;
            }else{
               return true;
            }
         }
      },
      {
         type: 'input',
         name: 'officeNumber',
         message: 'What is the office number of the manager: (Required): ',
         validate: (officeNumberInput) => {
            // [a-zA-Z0-9]{2,} meaning 2 or more alpha numeric ASCII letters,no special characters are allowed
            // ^ - start of string // $ - end of string.              
            const atleast2alphanumeric = /^[a-zA-Z0-9-#]{2,}$/
            if(!atleast2alphanumeric.test(officeNumberInput))
            {
               console.log(`\n>> Please provide at least 2 alpha-numeric and non-special characters only for the office number <<\n>> Hyphen (-) and hash (#) are allowed as special characters <<`);
               return false;
            }else if(officeNumberInput.includes("#-") || officeNumberInput.includes("-#") || officeNumberInput.includes("##") || officeNumberInput.includes("--")){
               console.log(`\n>> Please provide at least 3 non-numeric and non-special characters only for the name input <<\n>> Hyphen (-) and hash (#) cannot be adjacent nor consecutive <<`);
               return false; 
            }
            else{
               return true;
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
      // Prompt couldn't be rendered in the current environment
      if (err.isTtyError) {
         console.log("Your console environment is not supported!")
       } else {
         console.log(err)
       }
   });

 

