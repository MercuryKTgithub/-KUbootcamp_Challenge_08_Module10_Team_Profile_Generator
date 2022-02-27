const Engineer = require("../lib/Engineer");
const EMPTY_STRING = '';
const ROLE_CODE = 'Engineer';


test("Gets engineer's Github profile URL -------", () => {
  const engineer = new Engineer('Kimberly Tranz', '2101', EMPTY_STRING, 'MercuryKTgithub');
  expect(engineer.getGithub()).toEqual(expect.stringContaining('MercuryKTgithub'));
});
 
test("Gets engineer's role -------", () => {
   const engineer = new Engineer('Kimberly Tranz', '2101', 'ktranz@lmbaytechcorp.com', 'MercuryKTgithub');
   expect(engineer.getRole()).toEqual(expect.stringContaining(ROLE_CODE));
});