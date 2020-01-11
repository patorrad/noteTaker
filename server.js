var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res) {
    notes = readFileAsync(`./db/db.json`, 'utf8');
    console.log(notes);
    
    return res.json(notes);
  });

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

// async function hello() {
// notes = await readFileAsync(`./db/db.json`, 'utf8');
// console.log(notes);
// }

// hello();