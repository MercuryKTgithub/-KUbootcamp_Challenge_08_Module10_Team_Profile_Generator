
const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');
const Intern = require('../lib/Intern');
const generatePage = (managerEntity,  engineerTeam, internTeam) => {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
  <link rel="stylesheet" href="../src/style.css" />
  <title>HTML Template for Team Member Layout Rendering</title>
</head>

<body class="flex_column min_100_vh">
  <header class="hero">
    <h1 class="app_title"> My Team </h1>
  </header>
  <main class="flex-row justify_center frame">
    
   <!-- Start of Left Panel -->
    <div class="col-12 col-md-3">
       
    </div>
    <!-- End of Left Panel -->

    <!-- Start of Mid Panel -->
    <div class="col-12 col-md-6">
       <!-- Top sub-panel  -->
      <div id="summary" class="manager_block" >
         <h4 id="city_header" > 
         <span id="city_search_term">${managerEntity.name}</span>
         <span id="city_img_rep"></span>
         </h4>
        <div>
            <div id="city_temp" class="list_item">
              <img src="../src/images/manager.png" width='80' height='80'>&nbsp;&nbsp;&nbsp;&nbsp;<span>${getRoleInfo(managerEntity)}</span>
            </div>
            <div id="city_wind" class="list_item">
              <strong>ID: </strong> ${managerEntity.id}
            </div>
            <div id="city_hum" class="list_item">
              <strong>Email: </strong>${formatActiveEmail(managerEntity.email)}  
            </div>
            <div id="city_uvi"  class="list_item">
              <strong>Office number: </strong>${managerEntity.officeNumber}
            </div>
        </div>
      </div>
      <!-- bottom sub-panel -->
      <div id="five_day_panel" class="members justify_flex_start">
        
          <div class="flex-row justify_center" id="five_day_forcast_panel">
            ${renderEngineerMemberColumns(engineerTeam)} 
            ${renderInternMemberColumns(internTeam)} 
          </div>
      </div>

    </div>
    <!-- End of Mid Panel -->

     <!-- Start of Right Panel -->
     <div class="col-12 col-md-3">
       
    </div>
    <!-- End of Right Panel -->


  </main>  
   
</body>

</html>
  `;
};

const STRING_EMPTY = '';
const MEMBER_IMG_DIR = "../src/images/";

function getRoleInfo(entity){
   if(entity.officeNumber != null)
   {
      var mgr = new Manager(entity.name, entity.id, entity.email, entity.officeNumber);
      console.log(mgr.getRole());
      return mgr.getRole();
   }
   else if(entity.github != null)
   {
      var engr = new Engineer(entity.name, entity.id, entity.email, entity.github);
      console.log(engr.getRole());
      return engr.getRole();
   }
   else if(entity.school != null)
   {
      var intern = new Intern(entity.name, entity.id, entity.email, entity.school);
      console.log(intern.getRole());
      return intern.getRole();
   }
   else{
    return "Unknown";
   }
   
}

function renderEngineerMemberColumns(engineerTeam)
{
  var engineer_displayrecords  = [];
  for(var i = 0; i < engineerTeam.length; i++){
    var nextEngrMember = {
      name: null,
      icon: STRING_EMPTY,
      role: STRING_EMPTY,

      id: STRING_EMPTY,
      email: STRING_EMPTY,
      github: STRING_EMPTY, 
      iconfile: STRING_EMPTY
    }
    nextEngrMember.name = engineerTeam[i].name;
    nextEngrMember.icon = 'engineer.png';

    nextEngrMember.id = engineerTeam[i].id;
    nextEngrMember.email = engineerTeam[i].email;
    nextEngrMember.github = engineerTeam[i].github;
  
    imgPath = MEMBER_IMG_DIR + nextEngrMember.icon;    

    nextEngrMember.iconfile = imgPath;

    engineer_displayrecords.push(nextEngrMember);

  } // End of Engr For Loop

  let multiblock = '';
  let div = '';
  // imgPath = MEMBER_IMG_DIR + nextEngrMember.icon ;   
  for(var j = 0; j < engineer_displayrecords.length; j++)
  {
    div =  
    `<div class='team_member_card'>
     <h6 class='team_member_card_header'>${engineer_displayrecords[j].name}</h6>
      <div class='team_member_card_body'>
        <img src='${engineer_displayrecords[j].iconfile}' width='32' height='32'>&nbsp;&nbsp;&nbsp;<span>${getRoleInfo(engineer_displayrecords[j])}</span>
        <p><strong>ID: </strong>${engineer_displayrecords[j].id}</p>
        <p><strong>Email: </strong>${formatActiveEmail(engineer_displayrecords[j].email)}</p>
        <p><strong>GitHub: </strong>${openGitHubLinkInNewTab(engineer_displayrecords[j].github)}</p>
        
      </div>
    </div>`
    multiblock = multiblock + div;
  }
  return multiblock;
}

function openGitHubLinkInNewTab(github){
  var href_val = "target='_blank' " + github;
  return '<a href = ' + href_val +  ' >' + github + '</a>';
}

function formatActiveEmail(email){
   var href_val = "mailto:" + email;
   return '<a href = ' + href_val +  ' >' + email + '</a>';
}

function renderInternMemberColumns(internTeam)
{
  var intern_displayrecords  = [];
  for(var i = 0; i < internTeam.length; i++){
    var nextInternMember = {
      name: null,
      icon: STRING_EMPTY,
      role: STRING_EMPTY,

      id: STRING_EMPTY,
      email: STRING_EMPTY,
      school: STRING_EMPTY, 
      iconfile: STRING_EMPTY
    }
    nextInternMember.name = internTeam[i].name;
    nextInternMember.icon = 'intern.png';

    nextInternMember.id = internTeam[i].id;
    nextInternMember.email = internTeam[i].email;
    nextInternMember.school = internTeam[i].school;
  
    imgPath = MEMBER_IMG_DIR + nextInternMember.icon;    

    nextInternMember.iconfile = imgPath;

    intern_displayrecords.push(nextInternMember);

  } // End of Engr For Loop

  let multiblock = '';
  let div = '';
  // imgPath = MEMBER_IMG_DIR + nextInternMember.icon ;   
  for(var j = 0; j < intern_displayrecords.length; j++)
  {
    div =  
    `<div class='team_member_card'>
     <h6 class='team_member_card_header'>${intern_displayrecords[j].name}</h6>
      <div class='team_member_card_body'>
        <img src='${intern_displayrecords[j].iconfile}'>&nbsp;&nbsp;&nbsp;<span>${getRoleInfo(intern_displayrecords[j])}</span>
        <p><strong>ID: </strong>${intern_displayrecords[j].id}</p>
        <p><strong>Email: </strong> ${formatActiveEmail(intern_displayrecords[j].email)}</p>
        <p><strong>School: </strong>${intern_displayrecords[j].school}</p>
        
      </div>
    </div>`
    multiblock = multiblock + div;
  }
  return multiblock;
}

module.exports = generatePage; // no longer the case for the above method
