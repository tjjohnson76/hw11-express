const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const notes = require('express').Router();



notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});


notes.post('/', (req, res) => {
    // console.log(req.body)

    const { title, text } = req.body;

    if (req.body){

        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.error('Error in adding note')
    }
})

notes.delete('/:id', (req, res) => {
    // console.log('delete route being hit')
    const noteId = req.params.id;
    console.log(noteId)
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            console.log(json);
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            console.log(`Note ${noteId} has been deleted 🗑️`)
        })
})


module.exports = notes;