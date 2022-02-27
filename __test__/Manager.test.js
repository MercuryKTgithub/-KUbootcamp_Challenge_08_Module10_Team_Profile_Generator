const Manager = require("../lib/Manager")
const EMPTY_STRING = '';
const ROLE_CODE = 'Manager';

test("Gets manager's office number -------", () => {
  const manager = new Manager('John Brown', '3101', EMPTY_STRING,'Room-515');
  expect(manager.getOfficeNumer()).toEqual(expect.stringContaining(manager.officeNumber.toString()));
});

test("Gets manager's role -------", () => {
  const manager = new Manager('John Brown', '3101', 'jbrown@lmbaytechcorp.com', 'Room-515');
  expect(manager.getRole()).toEqual(expect.stringContaining(ROLE_CODE));
});
