// Require necessary modules for the app: express and routers:
const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const notesRoutes = require('./routes/notesRoutes');

// Setting up PORT; if process.env.PORT is not available, then 3001 will be used:
const PORT = process.env.PORT || 3001;

// Setting up express app
const app = express();

// Setting up middleware for parsing JSON and urlencoded form data; it also uses the public folder for static files:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`));

// Setting up the routes:
app.use(`/`, indexRoutes);
app.use(`/api/notes`, notesRoutes);

// Listening on PORT; if message displays, then the server is live!
app.listen(PORT, () =>
  console.log(
    `App listening at ${
      PORT === 3001 ? `localhost:` : `process.env.PORT:`
    }${PORT} 🚀`
  )
);
