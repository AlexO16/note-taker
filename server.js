//NPM
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
let dbPath = path.join(__dirname, './db/db.json')

let notes = JSON.parse(fs.readFileSync(dbPath)) || [];

//Express app set up
const PORT = 3001;
const app = express();

//Access files in public folder
app.use(express.static('public'));

//Sets up the Express app to handle data parsing on forms.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

//Route notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

//Gets the notes from the db.json
app.get('/api/notes', (req, res) => {
  res.json(notes)
});

//Create a new note, give note a unique ID, and add note to db.json
app.post('/api/notes', (req, res) => {
  let newNote = {
    ...req.body, //Spread syntex
    id: uuid.v4() //npm uuid
  }
  notes.push(newNote)
  fs.writeFileSync(dbPath, JSON.stringify(notes))
  res.end()
})

//Delete note using unique ID and update db.json
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id
    let noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex === -1) {
      res.sendStatus(404)  //If note is deleted from outside source on backend
      return 
    }
    notes.splice(noteIndex,1)
    fs.writeFileSync(dbPath, JSON.stringify(notes))
    res.end()
}) 

//Server set up
app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);