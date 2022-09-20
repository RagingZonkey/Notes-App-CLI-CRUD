const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    try {
        const readBuffer = fs.readFileSync('notes.json');
        const dataStringRepresentation = readBuffer.toString();
        return JSON.parse(dataStringRepresentation);
    } catch(e) {
        return [];
    }
}; 

const searchForNote = (notes, title) => {
    return notes.find(note => {
        if(note.title === title) {
            return note;
        }
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const searchedNote = searchForNote(notes, title);

    if(!!searchedNote) {
        console.log(chalk.green('Note found successfully:'),
        chalk.green.inverse(`${searchedNote.title}`));
        if(searchedNote.hasOwnProperty('time')) console.log(chalk.green
        .inverse(`Action appointed at: ${searchedNote.time}`));
    } else {
        console.log(chalk.red(`Such a note doesn't exist!`));
    }
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
    const note = searchForNote(notes, title);
    let elementIndex;
    if(!!searchForNote) {
        elementIndex = notes.indexOf(note);
    }
    /*
    for(let element of notes) {
        if(element.title === title) {
            elementIndex = notes.indexOf(element);
            notes.splice(elementIndex, 1);        
        }
    }
    */
    if(elementIndex === -1) {
        console.log(chalk.red('There is no note with such' +
        ' a title in the file.'));
        return null;
    } else {
        notes.splice(elementIndex, 1);
    }
    saveNotes(notes);
    console.log(chalk.green('Specified item has been removed.'));
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

/*
const saveSingleNote = (note) => {
    const dataJSON = JSON.stringify(note);
    fs.appendFileSync(dataJSON);
};
*/

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

const updateNote = (initialTitle, updatedTitle, updatedTime) => {
    const notes = loadNotes();
    const searchedNote = searchForNote(notes, initialTitle);
    if(!!searchedNote) {
        const noteIndex = notes.indexOf(searchedNote);
        notes.splice(noteIndex, 1);
        let initialTime;
        if(searchedNote.time !== undefined) {
            initialTime = searchedNote.time;
        }

        searchedNote.title = initialTitle !== updatedTitle
        ? updatedTitle 
        : initialTitle;
        if(updatedTime !== undefined && initialTime !== undefined) {
            searchedNote.time = initialTime !== updatedTime
            ? updatedTime
            : initialTime; 
        } else if(initialTime === undefined && updatedTime !== undefined) {
            searchedNote.time = updatedTime;
        } 
        
        notes.splice(noteIndex, 0, searchedNote);
        saveNotes(notes);
    
        if(searchedNote.title === initialTitle) {
            console.log(chalk.blue('The title value you entered is simillar to the initial title value.' +
            ' No changes to the title have been made.'));
        }
        if(searchedNote.time === initialTime) {
            console.log(chalk.blue('The time value you entered is simillar to the initial time value.' +
            ' No changes to the time value have been made.'));
        } 
        console.log(chalk.green('An update has been executed successfully.'));
    } else {
        console.log(chalk.red(`Such a note doesn't exist!`));
    }
};


module.exports = { 
    addNote,
    removeNote,
    listNotes, 
    readNote,
    updateNote,
};