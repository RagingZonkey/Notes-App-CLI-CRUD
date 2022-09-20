const yargs = require('yargs');
const notesFunctionality = require('./notes');

yargs.version('1.1.0');

// Create add functionality
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demandOption: true,
        },
        triggertime: {
            describe: 'Notification trigger time',
            type: 'string',
            demandOption: false,
        },
    },
    handler: (argv) => {
        notesFunctionality.addNote(argv.title, argv.triggertime);
    },
});

// Create remove functionality
yargs.command({
    command: 'remove',
    builder: {
        title: {
            describe: 'Title of the particular note you' +
            'want to delete',
            demandOption: true,
            type: 'string',
        }
    },
    describe: 'Remove a note',
    handler: (argv) => {
        notesFunctionality.removeNote(argv.title);
    },
});

// Create read functionality
yargs.command({
    command: 'read',
    builder: {
        title:{
            describe: `Search a note by it's name.`,
            demandOption: true,
            type: 'string',
        }
    },
    describe: 'Read a note',
    handler: (argv) => {
        notesFunctionality.readNote(argv.title);
    },
});

// Create list functionality
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        notesFunctionality.listNotes();
    },
});

// Create update functionality
yargs.command({
    command: 'update',
    describe: 'Update a note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demandOption: true,
        },
        changeTitle: {
            describe: 'Notification trigger time - updated value',
            type: 'string',
            demandOption: true,
        },
        changeTime: {
            describe: 'Notification trigger time - updated value',
            type: 'string',
            demandOption: false,
        },
    },
    handler: (argv) => {
        notesFunctionality.updateNote(argv.title, argv.changeTitle, argv.changeTime);
    },
});

yargs.parse();

