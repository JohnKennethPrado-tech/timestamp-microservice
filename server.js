const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so FreeCodeCamp can test the API remotely
app.use(cors({ optionsSuccessStatus: status => 200 }));

// Serve static files
app.use(express.static('public'));

// Home route
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API endpoint for a provided date
app.get("/api/:date", function(req, res) {
  processDate(req.params.date, res);
});

// Timestamp API endpoint for an empty date parameter
app.get("/api/", function(req, res) {
  processDate(undefined, res);
});

function processDate(dateInput, res) {
  let date;

  if (!dateInput) {
    date = new Date();
  } else {
    if (!isNaN(dateInput) && /^\d+$/.test(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      date = new Date(dateInput);
    }
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});