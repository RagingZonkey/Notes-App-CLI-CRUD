const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const searchedNote = notes.find(note => {
        if(note.title === title) {
            return note;
        }
    });

    if(!!searchedNote) {
        console.log(chalk.green('Note found successfuly:'), 
        chalk.green.inverse(`${searchedNote.title}`));
        if(searchedNote.hasOwnProperty('time')) console.log(chalk.green
        .inverse(`Action appointed at: ${searchedNote.time}`));
    } else console.log(chalk.red(`Such a note doesn't exist!`));
};

const addNote = (title, time) => {
    const notes = loadNotes();
    const notesArrayHasDuplicates = notes.find(note => note.title === title);

    if(!notesArrayHasDuplicates) {
        notes.push({
            title,
            time
        });
        saveNotes(notes);
        console.log(chalk.green('A new note has been created.'));
    } else {
        console.log(chalk.red('The title of the note you are ' +
        'trying to pass seems to be duplicate.'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    let elementIndex;
    for(let element of notes) {
        if(element.title === title) {
            elementIndex = notes.indexOf(element);
            notes.splice(elementIndex, 1);        
        }
    }
    if(elementIndex === undefined) {
        console.log(chalk.red('There is no note with such' +
        ' a title in the file.'));
        return null;
    }
    saveNotes(notes);
    console.log(chalk.green('Specified item has been removed.'));
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length > 0) {
        console.log(chalk.green.inverse('Your notes:'));
        notes.forEach(note => {
            console.log(note.title)
        });
    } else {
        console.log(chalk.red.inverse('There are currently no notes in the file.'));
    }
    
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
    addNote,
    removeNote,
    listNotes, 
    readNote
};