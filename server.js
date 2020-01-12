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

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", async function(req, res) {
    notes = JSON.parse(await readFileAsync(`./db/db.json`, 'utf8'));
    return res.json(notes);
  });

app.post("/api/notes", async function(req, res) {

    var newNote = req.body;

    console.log(newNote);
    notes = JSON.parse(await readFileAsync(`./db/db.json`, 'utf8'));
    notes.push(newNote);
    writeFileAsync("./db/db.json", JSON.stringify(notes), "utf8");

    res.json(true);
});

app.delete("/api/notes/:note", async function(req, res) {

    var chosen = req.params.note;

    console.log(chosen);

    let notes = JSON.parse(await readFileAsync(`./db/db.json`, 'utf8'));
    
    notes.splice(notes.indexOf(chosen), 1);
    console.log(notes);
    writeFileAsync("./db/db.json", JSON.stringify(notes), "utf8");
       
    return res.json(true);
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
