const fs = require('fs').promises;
const path = require('path');

const parseData = async () => {
  const data = await fs.readFile(path.join(__dirname, `../db/db.json`), `utf8`);
  const parsedData = JSON.parse(data);
  return parsedData;
};

const writeFile = async (data) => {
  await fs.writeFile(
    path.join(__dirname, `../db/db.json`),
    JSON.stringify(data)
  );
};

async function getAllNotes() {
  // All notes are retrieved from the db.json file with the readFile method:
  const parsedData = await parseData();
  return parsedData;
}

async function addNewNote(note) {
  const parsedData = await parseData();
  // The new note is added to the db.json file with the push method:
  parsedData.push(note);
  await writeFile(parsedData);

  return note;
}

async function deleteNoteById(id) {
  const parsedData = await parseData();
  // The note is deleted from the db.json file with the filter method:
  const filteredData = parsedData.filter((note) => note.id !== id);
  await writeFile(filteredData);

  return filteredData;
}

module.exports = { getAllNotes, addNewNote, deleteNoteById };
