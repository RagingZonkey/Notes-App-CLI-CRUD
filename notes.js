const fs = require('fs');

const getNotes = (title) => {
    return 'Your notes...'
};

const addNote = (title, time) => {
    const notes = loadNotes();
    const duplicateOnes = notes.filter(note => {
        return note.title === title;
    });

    if(duplicateOnes.length === 0) {
        notes.push({
            title,
            time
        });
        saveNotes(notes);
        console.log('A new note has been created.');
    } else {
        console.log('The title of the note you are ' +
        'trying to pass seems to be duplicate.');
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    for(let element of notes) {
        if(element.title === title) {
            const elementIndex = notes.indexOf(element);
            notes.splice(elementIndex, 1);
        }
    }
    saveNotes(notes);
    console.log('Specified item has been removed.')
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const readBuffer = fs.readFileSync('notes.json');
        const dataStringRepresentation = readBuffer.toString();
        return JSON.parse(dataStringRepresentation);
    } catch(e) {
        return [];
    }
};
 
module.exports = {
    getNotes, 
    addNote,
    removeNote
};