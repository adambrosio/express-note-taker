const db = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {

    function writeNotes(notes) {
        notes = JSON.stringify(notes);
        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) throw err
        });
    }
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", function (req, res) {
        res.json(db);
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

    app.post("/api/notes", function (req, res) {
        // Setting unique id for each note
        if (db.length == 0) {
            req.body.id = "0";
        } else {
            req.body.id = JSON.stringify(JSON.parse(db[db.length - 1].id) + 1);
        }
        // Push note with title, body, and id into the db.json
        db.push(req.body);

        writeNotes(db);
        console.log(db);

        res.json(req.body);

    });

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete("/api/notes/:id", function (req, res) {
        let id = req.params.id.toString();
        console.log(id);

        for (i = 0; i < db.length; i++) {
            if (db[i].id == id) {
                res.send(db[i]);

                db.splice(i, 1);
                break;
            };
        };
        writeNotes(db);
    });
};