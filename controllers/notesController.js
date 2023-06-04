const express = require('express');
const { v4: uuidv4 } = require('uuid');
const {
  getAllNotes,
  addNewNote,
  deleteNoteById,
} = require('../services/notesService');

async function allNotes(req, res) {
  // All notes are retrieved from the db.json file
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).send(`Internal Server Error: ${err}`);
  }
}

async function addNote(req, res) {
  // The new note is created and added to the db.json file
  try {
    const { title, text } = await req.body;
    const newNote = { title, text, id: uuidv4() };
    const savedNote = await addNewNote(newNote);
    res.json(savedNote);
  } catch (err) {
    res.status(500).send(`Internal Server Error: ${err}`);
  }
}

async function deleteNote(req, res) {
  // The note is deleted from the db.json file
  try {
    const updatedNotes = await deleteNoteById(req.params.id);
    res.json(updatedNotes);
  } catch (err) {
    res.status(500).send(`Internal Server Error: ${err}`);
  }
}

module.exports = { allNotes, addNote, deleteNote };
