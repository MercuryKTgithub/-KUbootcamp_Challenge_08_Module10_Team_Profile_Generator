const Employee = require('./Employee');
const githubDomainURL = "https://github.com/";

class Engineer extends Employee{
   constructor(name, id, email = '', github) {  
      super(name, id, email)
      this.github = githubDomainURL + github; // GitHub username
    } 

   getGithub(){
      // console.log("github URL is: " + this.github)
      return `${this.github}`;
   }

   getRole(){
      return 'Engineer';
   }

}
 
module.exports = Engineer;