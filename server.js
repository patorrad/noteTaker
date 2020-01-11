var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// });

app.get("/api/notes", async function(req, res) {
    notes = JSON.parse(await readFileAsync(`./db/db.json`, 'utf8'));
    return res.json(notes);
  });

app.post("/api/notes", async function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    //newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

    console.log(newNote);
    notes = JSON.parse(await readFileAsync(`./db/db.json`, 'utf8'));
    notes.push(newNote);
    writeFileAsync("./db/db.json", JSON.stringify(notes), "utf8");

    res.json(newNote);
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
