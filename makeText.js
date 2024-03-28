/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function newText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function makeTextFromFile(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error:
      ${err}`);
      process.exit(1);
    }
    newText(data);
  });
}

async function makeTextFromURL(url) {
  try {
    let resp = axios.get(url);
    newText(resp["data"]);
  } catch (err) {
    console.log(`Error:
    ${err}`);
    process.exit(2);
  }
}

let source = process.argv[2];

if (source === "file") {
  let path = process.argv[3];
  makeTextFromFile(path);
} else if (source === "url") {
  let url = process.argv[3];
  makeTextFromURL(url);
} else {
  console.log(`Unrecognized source: ${source}`);
  process.exit(3);
}
