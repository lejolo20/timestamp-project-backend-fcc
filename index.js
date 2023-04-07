// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  });
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  let msg;
  let regEx = /^\d{5,}$/;
  let date_string = req.params.date;

  console.log(msg)
  if (regEx.test(date_string)) {
    msg = new Date(parseInt(date_string));
  } else msg = new Date(date_string);

  console.log(msg)
  if (isNaN(msg.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: msg.getTime(),
      utc: msg.toUTCString(),
    });
  }
 
});

// listen for requests :)
var listener = app.listen(4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
