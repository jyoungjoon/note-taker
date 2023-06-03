const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, './db/db.json'))
  );
  res.send(data);
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = { title, text, id: Math.random() };
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, './db/db.json'))
  );
  data.push(newNote);

  fs.writeFile(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(data),
    (err) => (err ? console.error(err) : console.log(`success`))
  );
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, './db/db.json'))
  );

  const newData = data.filter((note) => note.id.toString() !== req.params.id);

  fs.writeFile(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(newData),
    (err) => (err ? console.error(err) : console.log(`success`))
  );
  res.json(`Success`);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
