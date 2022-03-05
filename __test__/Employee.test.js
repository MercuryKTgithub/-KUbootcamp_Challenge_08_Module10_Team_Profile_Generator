const Employee = require('../lib/Employee');
const EMPTY_STRING = '';
const ROLE_CODE = 'Employee';

test("This test gets employee's name - empty string id - no email necessary -------" , () => {
  const empployee = new Employee('John Brown', EMPTY_STRING);
  expect(empployee.getName()).toEqual(expect.stringContaining(empployee.name.toString()));
});

test("This test gets employee's id - no email necessary -------" , () => {
  const empployee = new Employee('John Brown', '1048');
  expect(empployee.getId()).toEqual(expect.stringContaining(empployee.id.toString()));
});

test("This test gets employee's email -------" , () => {
  const empployee = new Employee('John Brown', '1048', 'jbrown@lmbaytechcorp.com');
  expect(empployee.getEmail()).toEqual(expect.stringContaining(empployee.email.toString()));
});

test("This test gets employee's role -------" , () => {
  const empployee = new Employee('John Brown', '1048', 'jbrown@lmbaytechcorp.com');
  expect(empployee.getRole()).toEqual(expect.stringContaining(ROLE_CODE));
});

 