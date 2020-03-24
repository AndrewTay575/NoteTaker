const express = require("express");
const PORT = process.env.PORT || 4040;
const fs = require("fs");
const path = require("path");
const app = express();
let noteData = require("./db/db.json");

app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("api/notes", (req,res)=>{
    res.json(noteData)
});

app.post("/api/notes", (req,res)=>{
    console.log(req)
    console.log(req.body)
    noteData.push(req.body)
    noteData.forEach((note,i)=>{
        note.id = i +1
    });
    let newNote = JSON.stringify(noteData);
    fs.writeFileSync("./db/db.json", newNote);
    res.json(noteData);
});

app.delete("/api/nptes/:id", (req,res)=>{
    let filtered = noteData.filter(note=>note.id !== parseInt(req.params.id));
    console.log(filtered)
    fs.writeFileSync("./db/db.json", JSON.stringify(filtered))
    res.redirect("localhost:4040/notes")
});

app.listen(PORT, function() {
    console.log("App is listening on http://localhost:4040");
});
