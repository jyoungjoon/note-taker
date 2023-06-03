// Require necessary modules for the app: express, path, and fs
const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);

// Setting up PORT; if process.env.PORT is not available, then 3001 will be used
const PORT = process.env.PORT || 3001;

// Setting up express app
const app = express();

// Setting up express app to handle data parsing; static files are also served; the middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));

// GET routes for HTML files
app.get(`/`, (req, res) =>
  res.sendFile(path.join(__dirname, `/public/index.html`))
);
app.get(`/notes`, (req, res) =>
  res.sendFile(path.join(__dirname, `/public/notes.html`))
);

// GET routes for API files; the data is parsed and sent to the client
app.get(`/api/notes`, (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, `./db/db.json`))
  );
  res.send(data);
});

// POST route for API files
app.post(`/api/notes`, (req, res) => {
  // The new note is created and added to the db.json file
  const { title, text } = req.body;
  const newNote = { title, text, id: Math.trunc(Math.random() * 99999 + 1) };
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, `./db/db.json`))
  );
  data.push(newNote);
  fs.writeFile(
    path.join(__dirname, `./db/db.json`),
    JSON.stringify(data),
    (err) => (err ? console.error(err) : console.log(`success`))
  );
  res.json(newNote);
});

// DELETE route for API files
app.delete(`/api/notes/:id`, (req, res) => {
  // The note is deleted from the db.json file
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, `./db/db.json`))
  );

  // The note is deleted from the db.json file with the filter method:
  const newData = data.filter((note) => note.id !== req.params.id * 1);

  fs.writeFile(
    path.join(__dirname, `./db/db.json`),
    JSON.stringify(newData),
    (err) => (err ? console.error(err) : console.log(`success`))
  );
  res.json(newData);
});

// Listening on PORT; if message displays, then the server is live!
app.listen(PORT, () =>
  console.log(
    `App listening at ${
      PORT === 3001 ? `localhost:` : `process.env.PORT:`
    }${PORT} 🚀`
  )
);
