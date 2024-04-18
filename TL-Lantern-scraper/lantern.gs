function ScrapeLantern() {

// get raw html data for player builds
//var buildurl = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getValue();
//url testing
var buildurl = 'https://throneandliberty.gameslantern.com/builds/9bd5a2bb-218e-4785-a932-553109fd7362/purp';
var htmlobject = UrlFetchApp.fetch(buildurl);
var builddata = htmlobject.getContentText();

// regex parsing
var geararray = new RegExp(
  // find the weapons table
  "<h2[\s\S]*?>Weapons &amp; Armor[\s\S]*?<ul[\s\S]*?" +
  // match PrimaryWep rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match PrimaryWep traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match SecondaryWep rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match SecondaryWep traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Helmet rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Helmet traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Cloak rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Cloak traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Armor rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Armor traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Gloves rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Gloves traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Legs rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Legs traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Boots rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Boots traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Necklace rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Necklace traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Bracer rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Bracer traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match RingA rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match RingA traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match RingB rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Ring B traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))" +
  // match Belt rarity and name
  "(?:(?:[\s\S]*?<li[\s\S]*?<a href=[\s\S]*?color: rgb\\(([\s\S]*?)\\)[\s\S]*?>([\s\S]*?)<\\/a>" +
  // match Belt traits 3x
  "[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<[\s\S]*?<div[\s\S]*?>([\s\S]*?)<))" +
  // OR match empty
  "|(?:[\s\S]*?<li[\s\S]*?<div class=\"italic group- opacity-80 text-sm\">()()()()))"
);

var match = builddata.match(geararray);
console.log(match[0]);

};