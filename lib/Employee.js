class Employee {
  constructor(name, id, email = '') { //name and id are required
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName(){
      return `The employee's name in the system is ${this.name}`;
  }

  getId(){
    return `The employee's id in the system is ${this.id} - known under the employee-name of ${this.name}`;
  }

  getEmail(){
    return `The employee's email in the system is ${this.email} - known under the employee-name of ${this.name}`;
  }

  getRole(){
    return 'Employee';
  }

} // end of class def

module.exports = Employee;