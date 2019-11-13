// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/", function(req, res) {
  var currentDate = new Date();
  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

app.get("/api/timestamp/:dateString", function(req, res) {
  var input = req.params.dateString;
  var date = new Date(input);
  if (!isNaN(input)) {
    date = new Date(input * 1000);
  }

  // Check invalid
  var error = { error: "Invalid Date" };
  var letters = /[a-z]+/gi;
  if (input.match(letters)) {
    res.json(error);
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// listen for requests :)
// app.set("port", process.env.PORT || 5000);
var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Your app is listening on port " + port);
});
