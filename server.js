const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

let dbPath = path.join(__dirname, './db/db.json')
let notes = JSON.parse(fs.readFileSync(dbPath)) || [];


const PORT = 3001;
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
});


app.post('/api/notes', (req, res) => {
  let newNote = {
    ...req.body, 
    id: uuid.v4()
  }
  notes.push(newNote)
  fs.writeFileSync(dbPath, JSON.stringify(notes))
  res.end()
})


app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id
    let noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex === -1) {
      res.sendStatus(404)
      return 
    }
    notes.splice(noteIndex,1)
    fs.writeFileSync(dbPath, JSON.stringify(notes))
    res.end()
}) 


app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);