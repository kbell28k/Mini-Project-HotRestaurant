// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var tableData = require("./data/tableData.js")
var waitinglistData = require("./data/waitinglistData.js")

var path = require("path")

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================
// Tells node that we are creating an “express” server
var app = express();

// Sets an initial port. We”ll use this later in our listener
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../front-end/home.html"));
})

app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, "../front-end/reserve.html"));
})

app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, "../front-end/tables.html"));
})

// ================================================================================
// ROUTER
// The below points our server to a series of “route” files.
// These routes give our server a “map” of how to respond when users visit or request data from various URLs.
// ================================================================================

app.get("/api/tables", function (req, res){
    res.json(tableData)
})

app.get("/api/waitlist", function (req, res){
    res.json(waitinglistData)
})


app.post("/api/tables", function (req, res){
    if (tableData.length < 5) {
        tableData.push(req.body)
        res.json(true)
    }
    else {
        waitinglistData.push(req.body)
        res.json(false)
    }
})
// =============================================================================
// LISTENER

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});