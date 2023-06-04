const express = require('express');
const router = express.Router();
const {
  allNotes,
  addNote,
  deleteNote,
} = require('../controllers/notesController');

router.get(`/`, allNotes);
router.post(`/`, addNote);
router.delete(`/:id`, deleteNote);

module.exports = router;
