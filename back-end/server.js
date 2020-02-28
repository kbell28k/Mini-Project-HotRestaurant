var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json);

var reservations = {

}

var waitlist = {

}

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  ​
  app.get("/add",(req, res) => {
    res.sendFile(path.join(__dirname, "add.html"));
  });
  ​
  // Displays all reservations
  app.get("/api/reservations", (req, res) => {
    return res.json(reservations);
  });
  ​
  // Displays a single Reservation, or returns false
app.get("/api/reservations/:Reservation", (req, res) => {
    var chosen = req.params.Reservation;
  ​
    console.log(chosen);
  ​
    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
  ​
    return res.json(`${chosen} Reservation not found`);
  });
  ​
  // Create New Reservations - takes in JSON input
  app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  ​
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  ​
    console.log(newReservation);
  ​
    reservations.push(newReservation);
  ​
    res.json(newReservation);
  });




app.listen(PORT, () => {
    console.log("App Listening on PORT " + PORT)
});