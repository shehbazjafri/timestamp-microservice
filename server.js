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

app.get("/api/timestamp/:dateString", function(req, res) {
  const input = req.params.dateString;
  if (!input) {
    res.json({ unix: new Date() });
  }
  const date = new Date(input);

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
app.set("port", process.env.PORT || 5000);
const listener = app.listen(app.get("port"), function() {
  console.log("Your app is listening on port " + app.get("port"));
});
