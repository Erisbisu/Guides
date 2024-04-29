function ScrapeLantern() {

// get raw html data for player builds
//var buildurl = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getValue();
//url testing
var buildurl = 'https://throneandliberty.gameslantern.com/builds/9bd5a2bb-218e-4785-a932-553109fd7362/purp';
var htmlobject = UrlFetchApp.fetch(buildurl);
var builddata = htmlobject.getContentText();

// regex parsing
var geararray = 
  // />Weapons & Armor<\/h2>[\S\s]+?/gm

  /(?:(?:style="color: #[A-Z0-9]{6}">(.+)<[\S\s]+?(?:nowrap">(?:(?:\n<span>(\s|.*)<\/span)|(.*))[\S\s]+?)(?:nowrap">(?:(?:\n<span>(\s|.*)<\/span)|(.*))[\S\s]+?)(?:nowrap">(?:(?:\n<span>(\s|.*)<\/span)|(.*))[\S\s]+?))|(?:group- opacity-80 text-sm">(.*)<\/div()()()[\S\s]+?))/gm

var match = [...builddata.matchAll(geararray)];

for (let i = 0; i < match.length; i++) {
  match[i] = match[i].filter(n => n)
  match[i].shift()
  match[i] = match[i].map((x) => x.replace(/&#039;/g, "'"))
}

var build = {
  "weapon 1": match[0],
  "weapon 2": match[1],
  "helmet": match[2][0] && match[2][0].toLowerCase() == "head" ? "" : match[2],
  "cloak": match[3][0] && match[3][0].toLowerCase() == "cloak" ? "" : match[3],
  "chest": match[4][0] && match[4][0].toLowerCase() == "chest" ? "" : match[4],
  "hands": match[5][0] && match[5][0].toLowerCase() == "hands" ? "" : match[5],
  "legs": match[6][0] && match[6][0].toLowerCase() == "legs" ? "" : match[6],
  "feet": match[7][0] && match[7][0].toLowerCase() == "feet" ? "" : match[7],
  "necklace": match[8][0] && match[8][0].toLowerCase() == "necklace" ? "" : match[8],
  "bracelet": match[9][0] && match[9][0].toLowerCase() == "bracelet" ? "" : match[9],
  "ring1": match[10][0] && match[10][0].toLowerCase() == "ring" ? "" : match[10],
  "ring2": match[11][0] && match[11][0].toLowerCase() == "ring" ? "" : match[11],
  "belt": match[12][0] && match[12][0].toLowerCase() == "belt" ? "" : match[12],
}

}
