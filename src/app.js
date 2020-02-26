const express = require("express");
const google = require("google");

const bodyParser = require("body-parser");
const parseGoogleResults = require("./parseGoogleResults.js");

const app = express();

const googleIt = function(text) {
  const query = text;
  google(query, function(err, response) {
    google.resultsPerPage = 15;
    const results = response.links;
    const resultsToDisplay = parseGoogleResults(query, results);
    console.log("resutls are", resultsToDisplay);
    // res.send(resultsToDisplay);
    // res.end();
  });
};

const helloWorld = (req, res) => {
  googleIt("hehe");
  res.send("hello world");
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", helloWorld);
app.post("/", googleIt);

module.exports = app;
