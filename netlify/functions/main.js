const puppeteer = require("puppeteer");

exports.handler = async function calcScores(event) {
  let requestBody;
    console.log("Received event body:", event.body);
    try{
    requestBody = JSON.parse(event.body);
    console.log("Received request body:", requestBody);
  }
    catch(error){
      console.error("Failed to parse event body, error:", error)
    }
    
    console.log("Received URL:", requestBody.url); // Log the URL received from the request body

    const url = requestBody.url;
    //const url = "https://www.tfrrs.org/lists/4718/Little_East_Outdoor_Performance_List";

    const browser = await puppeteer.launch({
      headless: true,});
  
    const page = await browser.newPage();
    await page.goto(url);
  
    // Keep trying until response is not null
    let response = null;
    while (response === null) {
      response = await scoreTeams(page); // Pass the page as an argument
      if (response === null) {
        // Wait for a short duration before retrying
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    await browser.close();

    response = JSON.stringify(response)
    console.log("response" + response); // Print the response here

    //const stringifiedResponse = response.map(obj => JSON.stringify(obj, null, 2)).join('');

return {
    statusCode: 200,
    body: JSON.stringify({ message: response }),};
}

async function scoreTeams(page) {
    let teamNameandScores = [];
    let teams = [];
    let teamScores = []; //update this array with the teamList so indexes match
    // scoring : 10, 8, 6 , 4, 2, 1
    let addtoscore = 10;

    var gender = "m";

    for (let j = 0; j <= 5; j++) { //81
      if (
        (await page.$(
          `#list_data > div.panel-body.frame-loading-hide > div.row.gender_${gender}.standard_event_hnd_${j}`
        )) !== null
      ) {
        var rows = await page.$$(
          `#list_data > div.panel-body.frame-loading-hide > div.row.gender_m.standard_event_hnd_${j} tbody tr`,
          (element) => element.textContent
        );
        if (rows.length >= 6) {
          var numrows = 6;
        } else {
          var numrows = rows.length;
        }

        for (let i = 0; i < numrows; i++) {
          const row = rows[i];
          const headerName = await page.$eval(
            `#list_data > div.panel-body.frame-loading-hide > div.row.gender_m.standard_event_hnd_${j} > div > div.custom-table-title`,
            (element) => element.textContent
          );
          if (headerName.includes("Relay")) {
            // this will be used to determine if we are looking at a relay
            var teamName = await row.$eval(
              "td:nth-of-type(2)",
              (element) => element.textContent
            );
          } else {
            var teamName = await row.$eval(
              "td:nth-of-type(4)",
              (element) => element.textContent
            );
          }
          if (teams.includes(teamName) == false) {
            teams.push(teamName); // pushes to end of array so I find the index by subtracting from length
            if (addtoscore != 2) {
              teamScores[teamScores.length] = addtoscore;
              addtoscore -= 2;
            } else if (addtoscore == 2) {
              teamScores[teamScores.length] = addtoscore;
              addtoscore--;
            }
          } else {
            if (teams.includes(teamName) == true) {
              // find index of team => "" and add to it's score index
              if (addtoscore != 2) {
                teamScores[teams.indexOf(teamName)] += addtoscore;
                addtoscore -= 2;
              } else if (addtoscore == 2) {
                teamScores[teams.indexOf(teamName)] += addtoscore;
                addtoscore--;
              }
            }
          }
        }
        addtoscore = 10;
      }
    }
    // format teamNameandScores array so that it is a list of objects
    // format teamNameandScores array so that it is a list of objects
for (let i = 0; i < teams.length; i++) {
  const trimmedName = teams[i].trim(); // Trim whitespace from team name
  const score = teamScores[i];
  if (trimmedName && score !== undefined) { // Check for undefined values
      teamNameandScores.push({ name: trimmedName, score: score });
  } else {
      console.log("Undefined value found at index:", i);
  }
}

    // sort by score (highest to lowest)
    teamNameandScores.sort((a, b) => b.score - a.score);
    console.log("teamNameandScores:", teamNameandScores);
    return teamNameandScores;
  };
