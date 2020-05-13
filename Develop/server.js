var express = require("express");
var path = require("path");
let app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

app.listen(PORT, function(){
    console.log("Server is now listening on PORT " + PORT);
});