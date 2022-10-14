const express = require('express');
const path = require('path');

const PORT = 3001;
const app = express();

 app.get('index', (req, res) => {
     res.send
    }) 

app.post('./notes', (req, res) => {
    
})

// app.get('/', (req, res) => {
//     res.json
// })

// app.post('/', (req, res))

app.delete('/:id') 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


app.use(express.static('public'));

app.listen(PORT, () =>
     console.log(`listening at http://localhost:${PORT}`)
);