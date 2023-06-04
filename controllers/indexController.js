const express = require('express');
const path = require('path');

const sendUser = (req, res) => {
  if (req.url === '/') {
    res.sendFile(path.join(__dirname, `../public/index.html`));
  } else if (req.url === `/notes`) {
    res.sendFile(path.join(__dirname, `../public/notes.html`));
  } else {
    res.status(404).send('Page Not Found');
  }
};

module.exports = { sendUser };
