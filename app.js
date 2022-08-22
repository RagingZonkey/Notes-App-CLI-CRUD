const yargs = require('yargs');
const chalk = require('chalk');
const notesFunction = require('./notes');

yargs.version('1.1.0');

// Create add functionality
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string'
        },
        triggertime: {
            describe: 'Notification trigger time',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notesFunction.addNote(argv.title, argv.triggertime);
    }
});

// Create remove functionality
yargs.command({
    command: 'remove',
    builder: {
        title: {
            describe: 'Title of the particular note you' +
            'want to delete',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Remove a note',
    handler: (argv) => {
        notesFunction.removeNote(argv.title);
    }
});

// Create read functionality
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: () => {
        console.log('\nReading a note from '
        + 'the system!');
    }
});

// Create list functionality
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        console.log('\nListing all the notes from '
        + 'the system!');
    }
});



yargs.parse();

