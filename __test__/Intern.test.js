const Intern = require("../lib/Intern");
const EMPTY_STRING = '';
const ROLE_CODE = 'Intern';


test("Gets intern's school -------", () => {
  const intern = new Intern('Andy Washburn', '1022', EMPTY_STRING, 'University of Kansas');
  expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});
 
test("Gets intern's role -------", () => {
   const intern = new Intern('Andy Washburn', '1022', 'awashburn@lmbaytechcorp.com', 'University of Kansas');
   expect(intern.getRole()).toEqual(expect.stringContaining(ROLE_CODE));
});

exports.modules = Intern;